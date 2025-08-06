import { queryOptions, useQuery } from "@tanstack/react-query";

import { type CreateExpense } from "../../../server/sharedTypes";

const getOptions = {
  queryKey: () => ["create-expense-loading"],
} as const;

export const loadingCreateExpenseQueryOptions = queryOptions<{
  expense?: CreateExpense;
}>({
  queryKey: getOptions.queryKey(),
  queryFn: async () => {
    return {};
  },
  staleTime: Infinity,
});

export const useLoadingCreateExpenses = () => {
  return useQuery(loadingCreateExpenseQueryOptions);
};
