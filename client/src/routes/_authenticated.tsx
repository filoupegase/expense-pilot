import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Button } from "@/components/ui/Button";
import { userQueryOptions } from "@/queries/useGetCurrentUser";

const Login = () => {
  return (
    <div className="flex flex-col gap-y-2 items-center">
      <p>You have to login or register</p>
      <Button asChild>
        <a href="/api/login">Login!</a>
      </Button>
      <Button asChild>
        <a href="/api/register">Register!</a>
      </Button>
    </div>
  );
};

const Component = () => {
  const { user } = Route.useRouteContext();
  if (!user) {
    return <Login />;
  }

  return <Outlet />;
};


export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    // todo :use this here
    // client/src/lib/auth-client.ts
    const queryClient = context.queryClient;

    try {
      const data = await queryClient.fetchQuery(userQueryOptions);
      return data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return { user: null };
    }
  },
  component: Component,
});
