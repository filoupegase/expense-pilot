import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { minutesToMilliseconds } from "@/helpers/times";
const options = {
    getQueryKey: () => ["get-all-expenses"],
    enabled: true,
};
export function getAllExpensesQueryOptions() {
    return queryOptions({
        queryKey: [...options.getQueryKey()],
        queryFn: async () => {
            const res = await api.expenses.$get();
            if (!res.ok) {
                throw new Error("server error");
            }
            return await res.json();
        },
        enabled: options.enabled,
        staleTime: minutesToMilliseconds(5), // Cache for 5 minutes
    });
}
export const useGetAllExpenses = () => {
    return useQuery(getAllExpensesQueryOptions());
};
