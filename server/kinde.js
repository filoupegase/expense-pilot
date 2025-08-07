import { createKindeServerClient, GrantType } from "@kinde-oss/kinde-typescript-sdk";
import { createMiddleware } from "hono/factory";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
export const kindeClient = createKindeServerClient(GrantType.AUTHORIZATION_CODE, {
    authDomain: process.env.KINDE_DOMAIN,
    clientId: process.env.KINDE_CLIENT_ID,
    clientSecret: process.env.KINDE_CLIENT_SECRET,
    redirectURL: process.env.KINDE_REDIRECT_URI,
    logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URI,
});
export const sessionManager = (c) => ({
    async getSessionItem(key) {
        return getCookie(c, key);
    },
    async setSessionItem(key, value) {
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
        };
        if (typeof value === "string") {
            setCookie(c, key, value, cookieOptions);
        }
        else {
            setCookie(c, key, JSON.stringify(value), cookieOptions);
        }
    },
    async removeSessionItem(key) {
        deleteCookie(c, key);
    },
    async destroySession() {
        ["id_token", "access_token", "user", "refresh_token"].forEach((key) => {
            deleteCookie(c, key);
        });
    }
});
export const getUser = createMiddleware(async (c, next) => {
    try {
        const manager = sessionManager(c);
        const isAuthenticated = await kindeClient.isAuthenticated(sessionManager(c)); // Boolean: true or false
        if (!isAuthenticated) {
            return c.json({ error: "Not authenticated" }, 401);
        }
        const user = await kindeClient.getUserProfile(manager);
        c.set("user", user);
        await next();
    }
    catch (error) {
        console.error(error);
        return c.json({ error: "Unauthorized" }, 401);
    }
});
