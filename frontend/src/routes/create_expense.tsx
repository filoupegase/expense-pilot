import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { getAllExpensesQueryOptions } from "@/queries/useGetAllExpenses.ts";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { toast } from "sonner";
import { type CreateExpense, createExpensesSchema } from "../../../server/sharedTypes";
import { createExpense } from "@/lib/api.ts";
import { loadingCreateExpensesQueryOptions } from "@/queries/useLoadingCreateExpenses.ts";

export const Route = createFileRoute("/create_expense")({
  component: Index,
});

function Index() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      title: "",
      amount: "0",
    },
    onSubmit: async ({ value }: { value: CreateExpense }) => {
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const existingExpenses = await queryClient.ensureQueryData(
        getAllExpensesQueryOptions()
      );

      await navigate({ to: "/expenses" });

      //loading state
      queryClient.setQueryData(loadingCreateExpensesQueryOptions.queryKey, {
        expense: value,
      });

      try {
        const newExpense = await createExpense({ value });

        queryClient.setQueryData(
          getAllExpensesQueryOptions().queryKey, {
            ...existingExpenses,
            expenses: [newExpense, ...existingExpenses.expenses],
          }
        )
        toast("Expense Created", {
          description: `Successfully created new expense ${newExpense.id}`,
        });

      } catch {
        toast("Error", {
          description: "Failed to create expense new expense",
        });
      } finally {
        queryClient.setQueryData(loadingCreateExpensesQueryOptions.queryKey, {});
      }
    },
  });

  return (
    <div className="p-2">
      <h2>Create Expense</h2>
      <form className="flex flex-col gap-y-4 max-w-3xl m-auto"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
      >
        <form.Field
          name="title"
          validators={{
            onChange: createExpensesSchema.shape.title,
          }}
          children={(field) => (
            <div>
              <Label htmlFor={field.name}>Title :</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.isTouched && !field.state.meta.isValid ? (
                <em>{field.state.meta.errors.join(", ")}</em>
              ) : null}
            </div>
          )}
        />
        <form.Field
          name="amount"
          validators={{
            onChange: createExpensesSchema.shape.amount,
          }}
          children={(field) => (
            <div>
              <Label htmlFor={field.name}>Amont :</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="number"
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.isTouched && !field.state.meta.isValid ? (
                <em>{field.state.meta.errors.join(", ")}</em>
              ) : null}
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
