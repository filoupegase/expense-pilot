import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Button } from "@/components/ui/Button";
import { userQueryOptions } from "@/queries/useGetCurrentUser";
const Login = () => {
    return (_jsxs("div", { className: "flex flex-col gap-y-2 items-center", children: [_jsx("p", { children: "You have to login or register" }), _jsx(Button, { asChild: true, children: _jsx("a", { href: "/api/login", children: "Login!" }) }), _jsx(Button, { asChild: true, children: _jsx("a", { href: "/api/register", children: "Register!" }) })] }));
};
const Component = () => {
    const { user } = Route.useRouteContext();
    if (!user) {
        return _jsx(Login, {});
    }
    return _jsx(Outlet, {});
};
export const Route = createFileRoute("/_authenticated")({
    beforeLoad: async ({ context }) => {
        const queryClient = context.queryClient;
        try {
            const data = await queryClient.fetchQuery(userQueryOptions);
            return data;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }
        catch (error) {
            return { user: null };
        }
    },
    component: Component,
});
