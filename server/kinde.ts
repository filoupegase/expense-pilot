import {
  createKindeServerClient,
  GrantType,
  type SessionManager,
  type UserType
} from "@kinde-oss/kinde-typescript-sdk";
import { type Context } from "hono";
import { createMiddleware } from "hono/factory";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";

export const kindeClient = createKindeServerClient(GrantType.AUTHORIZATION_CODE, {
  authDomain: process.env.KINDE_DOMAIN!,
  clientId: process.env.KINDE_CLIENT_ID!,
  clientSecret: process.env.KINDE_CLIENT_SECRET!,
  redirectURL: process.env.KINDE_REDIRECT_URI!,
  logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URI!,
});

export const sessionManager = (c: Context): SessionManager => ({
  async getSessionItem(key: string) {
    return getCookie(c, key);
  },
  async setSessionItem(key: string, value: unknown) {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    } as const;

    if (typeof value === "string") {
      setCookie(c, key, value, cookieOptions);
    } else {
      setCookie(c, key, JSON.stringify(value), cookieOptions);
    }
  },
  async removeSessionItem(key: string) {
    deleteCookie(c, key);
  },
  async destroySession() {
    ["id_token", "access_token", "user", "refresh_token"].forEach((key: string) => {
      deleteCookie(c, key);
    });
  }
});

type Env = {
  Variables: {
    user: UserType
  }
}

export const getUser = createMiddleware<Env>(async (c, next) => {
  try {
    const manager = sessionManager(c);
    const isAuthenticated = await kindeClient.isAuthenticated(sessionManager(c)); // Boolean: true or false

    if (!isAuthenticated) {
      return c.json({ error: "Not authenticated" }, 401);
    }

    const user: UserType = await kindeClient.getUserProfile(manager);
    c.set("user", user);

    await next();
  } catch (error) {
    console.error(error);
    return c.json({ error: "Unauthorized" }, 401);
  }
});
