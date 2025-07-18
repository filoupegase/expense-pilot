import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api.ts";
import { minutesToMilliseconds } from "@/helpers/times.ts";

export const queryParams = {
    getQueryKey: () => ["total-spent"],
} as const;

export const useGetExpenseTotalSpent = () => {
    return useQuery({
        queryKey: [...queryParams.getQueryKey()],
        queryFn: async () => {
            const res = await api.expenses["total-spent"].$get();
            if (!res.ok) {
                throw new Error("Failed to fetch total spent");
            }

            return await res.json();
        },
        staleTime: minutesToMilliseconds(5) // Cache for 5 minutes
    });
};