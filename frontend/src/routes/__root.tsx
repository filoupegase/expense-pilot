import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/Sonner";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { type QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Root />
});

function NavBar() {
  return (
    <div className="p-2 flex gap-2 max-w-2xl m-auto">
      <Link to="/"><h1 className="text-2xl font-bold">Expense Tracker</h1></Link>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/expenses" className="[&.active]:font-bold">
          Expenses
        </Link>
        <Link to="/create_expense" className="[&.active]:font-bold">
          Create
        </Link>
        <Link to="/profile" className="[&.active]:font-bold">
          Profile
        </Link>
      </div>
    </div>
  );
}

function Root() {
  return (
    <>
      <NavBar />
      <hr />
      <div className="p-2 flex gap-2 max-w-2xl m-auto">
        <Outlet />
      </div>
      <Toaster />
      <TanStackRouterDevtools />
    </>
  );
}
