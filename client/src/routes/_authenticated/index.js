import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createFileRoute } from "@tanstack/react-router";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { useGetExpenseTotalSpent } from "@/queries/useGetExpenseTotalSpent";
export const Route = createFileRoute("/_authenticated/")({
    component: Index,
});
function Index() {
    const { isPending, error, data } = useGetExpenseTotalSpent();
    if (error)
        return "An error has occurred: " + error.message;
    return (_jsxs(Card, { className: "w-[350px] m-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Total Spent" }), _jsx(CardDescription, { children: "The total amount you've spent" })] }), _jsx(CardContent, { children: isPending ? "..." : data.total })] }));
}
