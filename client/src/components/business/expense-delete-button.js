import { jsx as _jsx } from "react/jsx-runtime";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/Button";
import { Trash } from "lucide-react";
import { deleteExpense } from "@/lib/api";
import { toast } from "sonner";
import { getAllExpensesQueryOptions } from "@/queries/useGetAllExpenses";
export default function ExpenseDeleteButton({ id }) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deleteExpense,
        onError: () => {
            toast("Error", {
                description: `Failed to delete expense: ${id}`,
            });
        },
        onSuccess: () => {
            toast("Expense Deleted", {
                description: `Successfully deleted expense: ${id}`,
            });
            queryClient.setQueryData(getAllExpensesQueryOptions().queryKey, (existingExpenses) => ({
                ...existingExpenses,
                expenses: existingExpenses.expenses.filter((e) => e.id !== id),
            }));
        },
    });
    return (_jsx(Button, { disabled: mutation.isPending, onClick: () => mutation.mutate({ id }), variant: "outline", size: "icon", children: mutation.isPending ? "..." : _jsx(Trash, { className: "h-4 w-4" }) }));
}
