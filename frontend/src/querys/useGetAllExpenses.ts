import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api.ts";
import { minutesToMilliseconds } from "@/helpers/times.ts";

export const queryParams = {
  getQueryKey: () => ["get-all-expenses"],
  enabled: true,
} as const;

export const useGetAllExpenses = () => {
  return useQuery({
    queryKey: [...queryParams.getQueryKey()],
    queryFn: async () => {
      const res = await api.expenses.$get();
      if (!res.ok) {
        throw new Error("server error");
      }

      return await res.json();
    },
    enabled: queryParams.enabled,
    staleTime: minutesToMilliseconds(5) // Cache for 5 minutes
  });
};