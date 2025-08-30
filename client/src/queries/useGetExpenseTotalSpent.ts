import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { getTotalExpenses } from "@/lib/api";

const options = {
  getQueryKey: () => ["total-spent"],
  enabled: true,
} as const;

function getExpenseTotalSpentGroupedOptions() {
  return queryOptions({
    queryKey: [...options.getQueryKey()],
    queryFn: getTotalExpenses,
    staleTime: Infinity,
    retry: false,
    throwOnError: true,
  });
}

//staleTime: minutesToMilliseconds(10) // Cache for 10 minutes

export const useGetExpenseTotalSpent = () => {
  return useSuspenseQuery(getExpenseTotalSpentGroupedOptions());
};
