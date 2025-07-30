import { createFileRoute } from "@tanstack/react-router";
import { useLoadingCreateExpenses } from "@/queries/useLoadingCreateExpenses";
import { useGetAllExpenses } from "@/queries/useGetAllExpenses";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Skeleton } from "@/components/ui/Skeleton";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/expenses")({
  component: Index,
});

function Index() {
  const { isPending, error, data } = useGetAllExpenses();
  const { data: loadingCreateExpense } = useLoadingCreateExpenses();

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="p-2 max-w-3xl m-auto">
      <Table>
        <TableCaption>A list of all your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loadingCreateExpense?.expense && (
            <TableRow>
              <TableCell className="font-medium">
                <Skeleton className="h-4" />
              </TableCell>
              <TableCell>{loadingCreateExpense?.expense.title}</TableCell>
              <TableCell>{loadingCreateExpense?.expense.amount}</TableCell>
              <TableCell>
                {/*{loadingCreateExpense?.expense.date.split("T")[0]}*/}
              </TableCell>
              <TableCell className="font-medium">
                <Skeleton className="h-4" />
              </TableCell>
            </TableRow>
          )}
          {isPending
            ? Array(3)
              .fill(0)
              .map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                </TableRow>
              ))
            : data?.expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.id}</TableCell>
                <TableCell>{expense.title}</TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>
                  <ExpenseDeleteButton id={expense.id} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

function ExpenseDeleteButton(id: { id: number }) {
  const queryClient = useQueryClient();
  return (
    <Button variant="outline" size="icon">
      <Trash className="h-4 w-4" />
    </Button>
  );
}
