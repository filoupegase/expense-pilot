import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { minutesToMilliseconds } from "@/helpers/times";

export const queryParams = {
  getQueryKey: () => ["total-spent"],
  enabled: true,
} as const;

function getExpenseTotalSpentGroupedOptions() {
  return queryOptions({
    queryKey: [...queryParams.getQueryKey()],
    queryFn: async () => {
      const res = await api.expenses["total-spent"].$get();
      if (!res.ok) {
        throw new Error("Failed to fetch total spent");
      }

      return await res.json();
    },
    staleTime: minutesToMilliseconds(10) // Cache for 10 minutes
  });
}

export const useGetExpenseTotalSpent = () => {
  return useSuspenseQuery(getExpenseTotalSpentGroupedOptions());
};
