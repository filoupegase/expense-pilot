import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { getAllExpensesQueryOptions } from "@/queries/useGetAllExpenses";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createExpenseSchema } from "../../../../server/sharedTypes";
import { createExpense } from "@/lib/api";
import { useAppForm } from "@/hooks/form";
import { loadingCreateExpenseQueryOptions } from "@/queries/useLoadingCreateExpenses";
import { formOpts } from "@/CreateExpenseForm/shared-form";

export const Route = createFileRoute("/_authenticated/create_expense")({
  component: Index,
});

function Index() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const form = useAppForm({
    ...formOpts,
    validators: {
      onChange: createExpenseSchema,
    },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const existingExpenses = await queryClient.ensureQueryData(
        getAllExpensesQueryOptions()
      );

      await navigate({ to: "/expenses" });

      // loading state
      queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {
        expense: value,
      });

      try {
        const newExpense = await createExpense({ value });

        await new Promise((resolve) => setTimeout(resolve, 2800));

        queryClient.setQueryData(
          getAllExpensesQueryOptions().queryKey, {
            ...existingExpenses,
            expenses: [newExpense, ...existingExpenses.expenses],
          });

        // success state
        toast("Expense Created", {
          description: `Successfully created new expense: ${newExpense.id}`,
        });
      } catch {
        // error state
        toast("Error", {
          description: `Failed to create new expense`,
        });
      } finally {
        queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {});
      }
    },
  });

  return (
    <div className="p-2">
      <h2 className="mb-4">Create Expense</h2>
      <form
        className="flex flex-col gap-y-4 max-w-xl m-auto"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <form.AppField
          name="title"
          children={(field) => <field.TextField label="Title" />}
        />
        <form.AppField
          name="amount"
          children={(field) => <field.TextField label="Amount" />}
        />
        <div className="self-center">
          <form.AppField
            name="date"
            children={(field) => <field.CalendarFields />}
          />
        </div>
        <form.AppForm>
          <form.SubscribeButton />
        </form.AppForm>
      </form>
    </div>
  );
}
