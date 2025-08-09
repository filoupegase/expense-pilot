import { jsx as _jsx } from "react/jsx-runtime";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/about")({
    component: Index,
});
function Index() {
    return _jsx("div", { className: "p-2", children: "Coming soon!" });
}
