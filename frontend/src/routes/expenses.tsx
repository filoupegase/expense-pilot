import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/expenses")({
    component: Index,
});

function Index() {
    return <div className="p-2">Show All Expenses</div>;
}