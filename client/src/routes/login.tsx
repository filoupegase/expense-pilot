import {
  createFileRoute,
  //redirect,
} from "@tanstack/react-router";
import { userQueryOptions } from "@/queries/useGetCurrentUser";

export const Route = createFileRoute("/login")({
  component: () => <Login />,
  beforeLoad: async ({ context, search }) => {
    const user = await context.queryClient.ensureQueryData(userQueryOptions());
    if (user) {
      //throw redirect({ to: search.redirect });
    }
  },
});

function Login() {
  return <div className="p-2">Login Page!</div>;
}
