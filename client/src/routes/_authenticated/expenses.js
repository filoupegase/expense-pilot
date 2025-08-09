import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createFileRoute } from "@tanstack/react-router";
import { useLoadingCreateExpenses } from "@/queries/useLoadingCreateExpenses";
import { useGetAllExpenses } from "@/queries/useGetAllExpenses";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/Table";
import { Skeleton } from "@/components/ui/Skeleton";
import ExpenseDeleteButton from "@/components/business/expense-delete-button";
export const Route = createFileRoute("/_authenticated/expenses")({
    component: Index,
});
function Index() {
    const { isPending, error, data } = useGetAllExpenses();
    const { data: loadingCreateExpense } = useLoadingCreateExpenses();
    if (error)
        return "An error has occurred: " + error.message;
    return (_jsx("div", { className: "p-2 max-w-3xl m-auto", children: _jsxs(Table, { children: [_jsx(TableCaption, { children: "A list of all your expenses." }), _jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-[100px]", children: "Id" }), _jsx(TableHead, { children: "Title" }), _jsx(TableHead, { children: "Amount" }), _jsx(TableHead, { children: "Date" }), _jsx(TableHead, { children: "Delete" })] }) }), _jsxs(TableBody, { children: [loadingCreateExpense?.expense && (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: _jsx(Skeleton, { className: "h-4" }) }), _jsx(TableCell, { children: loadingCreateExpense?.expense.title }), _jsx(TableCell, { children: loadingCreateExpense?.expense.amount }), _jsx(TableCell, { children: loadingCreateExpense?.expense.date.split("T")[0] }), _jsx(TableCell, { className: "font-medium", children: _jsx(Skeleton, { className: "h-4" }) })] })), isPending
                            ? Array(3)
                                .fill(0)
                                .map((_, i) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: _jsx(Skeleton, { className: "h-4" }) }), Array(4)
                                        .fill(0)
                                        .map((_, j) => (_jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4" }) }, j)))] }, i)))
                            : data?.expenses.map((expense) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: expense.id }), _jsx(TableCell, { children: expense.title }), _jsx(TableCell, { children: expense.amount }), _jsx(TableCell, { children: expense.date.split("T")[0] }), _jsx(TableCell, { children: _jsx(ExpenseDeleteButton, { id: expense.id }) })] }, expense.id)))] })] }) }));
}
