import { queryOptions, useQuery } from "@tanstack/react-query";

import { type CreateExpense } from "../../../server/sharedTypes";

const getQueryKey = {
  queryKey: () => ["create-expense-loading"],
} as const

export const loadingCreateExpensesQueryOptions = queryOptions<{
  expense?: CreateExpense;
}>({
  queryKey: getQueryKey.queryKey(),
  queryFn: async () => {
    return {}
  },
  staleTime: Infinity,
});

export const useLoadingCreateExpenses = () => useQuery(loadingCreateExpensesQueryOptions);
