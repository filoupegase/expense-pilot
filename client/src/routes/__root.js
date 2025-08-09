import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/Sonner";
export const Route = createRootRouteWithContext()({
    component: () => _jsx(Root, {})
});
function NavBar() {
    return (_jsxs("div", { className: "p-2 flex justify-between max-w-2xl m-auto items-baseline", children: [_jsx(Link, { to: "/", children: _jsx("h1", { className: "text-2xl font-bold", children: "Expense Tracker" }) }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Link, { to: "/", className: "[&.active]:font-bold", children: "Home" }), " ", _jsx(Link, { to: "/about", className: "[&.active]:font-bold", children: "About" }), _jsx(Link, { to: "/expenses", className: "[&.active]:font-bold", children: "Expenses" }), _jsx(Link, { to: "/create_expense", className: "[&.active]:font-bold", children: "Create" }), _jsx(Link, { to: "/profile", className: "[&.active]:font-bold", children: "Profile" })] })] }));
}
function Root() {
    return (_jsxs(_Fragment, { children: [_jsx(NavBar, {}), _jsx("hr", {}), _jsx("div", { className: "p-2 max-w-2xl m-auto", children: _jsx(Outlet, {}) }), _jsx(Toaster, {})] }));
}
