import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/create_expense")({
    component: Index,
});

function Index() {
    return <div className="p-2">Create Expense</div>;
}