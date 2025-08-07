import { queryOptions, useQuery } from "@tanstack/react-query";
const getOptions = {
    queryKey: () => ["create-expense-loading"],
};
export const loadingCreateExpenseQueryOptions = queryOptions({
    queryKey: getOptions.queryKey(),
    queryFn: async () => {
        return {};
    },
    staleTime: Infinity,
});
export const useLoadingCreateExpenses = () => {
    return useQuery(loadingCreateExpenseQueryOptions);
};
