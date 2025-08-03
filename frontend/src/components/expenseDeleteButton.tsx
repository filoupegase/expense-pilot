import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/Button";
import { Trash } from "lucide-react";

function ExpenseDeleteButton(id: { id: number }) {
  const queryClient = useQueryClient();
  return (
    <Button variant="outline" size="icon">
      <Trash className="h-4 w-4" />
    </Button>
  );
}

export { ExpenseDeleteButton };
