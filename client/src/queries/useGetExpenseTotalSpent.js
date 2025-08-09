import { useQuery } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { client } from "@/lib/api";
import { minutesToMilliseconds } from "@/helpers/times";
const options = {
    getQueryKey: () => ["total-spent"],
    enabled: true,
};
function getExpenseTotalSpentGroupedOptions() {
    return queryOptions({
        queryKey: [...options.getQueryKey()],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const res = await client.expenses["total-spent"].$get();
            if (!res.ok) {
                throw new Error("Failed to fetch total spent");
            }
            const data = await res.json();
            return data;
        },
        staleTime: minutesToMilliseconds(10) // Cache for 10 minutes
    });
}
export const useGetExpenseTotalSpent = () => {
    return useQuery(getExpenseTotalSpentGroupedOptions());
};
