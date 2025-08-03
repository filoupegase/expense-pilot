import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { getAllExpensesQueryOptions } from "@/queries/useGetAllExpenses";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Calendar } from "@/components/ui/Calendar";
import { FieldInfo } from "@/components/fieldInfo";
import { Label } from "@/components/ui/Label";
import { toast } from "sonner";
import { createExpenseSchema } from "../../../../server/sharedTypes";
import { createExpense } from "@/lib/api";
import { loadingCreateExpenseQueryOptions } from "@/queries/useLoadingCreateExpenses";

export const Route = createFileRoute("/_authenticated/create_expense")({
  component: Index,
});

function Index() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      title: "",
      amount: "0",
      date: new Date().toISOString(),
    },
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
      <h2>Create Expense</h2>
      <form
        className="flex flex-col gap-y-4 max-w-xl m-auto"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >

        <form.Field
          name="title"
          children={(field) => (
            <div>
              <Label htmlFor={field.name}>Title</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        />

        <form.Field
          name="amount"
          children={(field) => (
            <div>
              <Label htmlFor={field.name}>Amount</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="number"
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        />

        <form.Field
          name="date"
          children={(field) => (
            <div className="self-center">
              <Calendar
                mode="single"
                className="rounded-md border"
                selected={new Date(field.state.value)}
                onSelect={(date: Date | undefined) =>
                  field.handleChange((date ?? new Date()).toISOString())
                }
              />
              <FieldInfo field={field} />
            </div>
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button className="mt-4" type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Submit"}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
