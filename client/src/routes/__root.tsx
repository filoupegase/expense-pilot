import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/Sonner";

import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
// coming soon
// import { ReactFormDevtoolsPanel } from "@tanstack/react-form";

import React from "react";
import { type QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Root />
});

const TanStackDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
      // Lazy load in development
      import("@tanstack/react-devtools").then((res) => ({
        default: res.TanStackDevtools,
        // For Embedded Mode
        // default: res.TanStackRouterDevtoolsPanel
      })),
    );

function NavBar() {
  return (
    <div className="p-2 flex justify-between max-w-2xl m-auto items-baseline">
      <Link to="/">
        <h1 className="text-2xl font-bold">Expense Tracker</h1>
      </Link>
      <div className="flex gap-2">
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
      <div className="p-2 max-w-2xl m-auto">
        <Outlet />
      </div>
      <Toaster />

      <TanStackDevtools
        config={{
          position: "bottom-left"
        }}
        plugins={[
          {
            name: "TanStack Query",
            render: <ReactQueryDevtoolsPanel />,
          },
          {
            name: "TanStack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
          // {
          //   name: 'TanStack Form',
          //   render: <ReactFormDevtoolsPanel />,
          // },
        ]}
      />
    </>
  );
}
