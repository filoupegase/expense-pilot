import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createFileRoute } from "@tanstack/react-router";
import { useGetCurrentUser } from "@/queries/useGetCurrentUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
export const Route = createFileRoute("/_authenticated/profile")({
    component: Index,
});
function Index() {
    const { isPending, error, data } = useGetCurrentUser();
    if (isPending)
        return "loading";
    if (error)
        return "not logged in";
    return (_jsxs("div", { className: "p-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Avatar, { children: [data.user.picture && (_jsx(AvatarImage, { src: data.user.picture, alt: data.user.given_name })), _jsx(AvatarFallback, { children: data.user.given_name })] }), _jsxs("p", { children: [data.user.given_name, " ", data.user.family_name] })] }), _jsx(Button, { asChild: true, className: "my-4", children: _jsx("a", { href: "/api/logout", children: "Logout!" }) })] }));
}
