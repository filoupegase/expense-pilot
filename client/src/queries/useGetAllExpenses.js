import { queryOptions, useQuery } from "@tanstack/react-query";
import { minutesToMilliseconds } from "@/helpers/times";
import { getExpenses } from "@/lib/api";
const options = {
    getQueryKey: () => ["get-all-expenses"],
    enabled: true,
};
export function getAllExpensesQueryOptions() {
    return queryOptions({
        queryKey: [...options.getQueryKey()],
        queryFn: getExpenses,
        enabled: options.enabled,
        staleTime: minutesToMilliseconds(5), // Cache for 5 minutes
    });
}
export const useGetAllExpenses = () => {
    return useQuery(getAllExpensesQueryOptions());
};
