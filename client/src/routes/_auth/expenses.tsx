import { createFileRoute } from "@tanstack/react-router";
import { useLoadingCreateExpenses } from "@/queries/useLoadingCreateExpenses";
import { useGetAllExpenses } from "@/queries/useGetAllExpenses";
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
import ExpenseDeleteButton from "@/components/business/expense-delete-button";

export const Route = createFileRoute("/_auth/expenses")({
  component: Index,
});

function Index() {
  // const { isPending, error, data } = useGetAllExpenses();
  // const { data: loadingCreateExpense } = useLoadingCreateExpenses();
  //
  // if (error) return "An error has occurred: " + error.message;

  // return (
  //   <div className="p-2 max-w-3xl m-auto">
  //     <Table>
  //       <TableCaption>A list of all your expenses.</TableCaption>
  //       <TableHeader>
  //         <TableRow>
  //           <TableHead className="w-[100px]">Id</TableHead>
  //           <TableHead>Title</TableHead>
  //           <TableHead>Amount</TableHead>
  //           <TableHead>Date</TableHead>
  //           <TableHead>Delete</TableHead>
  //         </TableRow>
  //       </TableHeader>
  //       <TableBody>
  //         {loadingCreateExpense?.expense && (
  //           <TableRow>
  //             <TableCell className="font-medium">
  //               <Skeleton className="h-4" />
  //             </TableCell>
  //             <TableCell>{loadingCreateExpense?.expense.title}</TableCell>
  //             <TableCell>{loadingCreateExpense?.expense.amount}</TableCell>
  //             <TableCell>
  //               {loadingCreateExpense?.expense.date.split("T")[0]}
  //             </TableCell>
  //             <TableCell className="font-medium">
  //               <Skeleton className="h-4" />
  //             </TableCell>
  //           </TableRow>
  //         )}
  //         {isPending
  //           ? Array(3)
  //             .fill(0)
  //             .map((_, i) => (
  //               <TableRow key={i}>
  //                 <TableCell className="font-medium">
  //                   <Skeleton className="h-4" />
  //                 </TableCell>
  //                 {Array(4)
  //                   .fill(0)
  //                   .map((_, j) => (
  //                     <TableCell key={j}>
  //                       <Skeleton className="h-4" />
  //                     </TableCell>
  //                   ))}
  //               </TableRow>
  //             ))
  //           : data?.expenses.map((expense) => (
  //             <TableRow key={expense.id}>
  //               <TableCell className="font-medium">{expense.id}</TableCell>
  //               <TableCell>{expense.title}</TableCell>
  //               <TableCell>{expense.amount}</TableCell>
  //               <TableCell>{expense.date.split("T")[0]}</TableCell>
  //               <TableCell>
  //                 <ExpenseDeleteButton id={expense.id} />
  //               </TableCell>
  //             </TableRow>
  //           ))}
  //       </TableBody>
  //     </Table>
  //   </div>
  // );
}
