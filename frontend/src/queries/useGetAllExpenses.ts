import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { minutesToMilliseconds } from "@/helpers/times";

export const queryParams = {
  getQueryKey: () => ["get-all-expenses"],
  enabled: true,
} as const;

export function getAllExpensesQueryOptions() {
  return queryOptions({
    queryKey: [...queryParams.getQueryKey()],
    queryFn: async () => {
      const res = await api.expenses.$get();
      if (!res.ok) {
        throw new Error("server error");
      }

      return await res.json();
    },
    enabled: queryParams.enabled,
    staleTime: minutesToMilliseconds(5), // Cache for 5 minutes
  });
}

export const useGetAllExpenses = () => {
  return useQuery(getAllExpensesQueryOptions());
};
