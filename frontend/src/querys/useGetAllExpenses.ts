import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "@/lib/api.ts";
import { minutesToMilliseconds } from "@/helpers/times.ts";

export const queryParams = {
  getQueryKey: () => ["get-all-expenses"],
} as const;

export const useGetAllExpenses = () => {
  return useSuspenseQuery({
    queryKey: [...queryParams.getQueryKey()],
    queryFn: async () => {
      const res = await api.expenses.$get();
      if (!res.ok) {
        throw new Error("server error");
      }

      return await res.json();
    },
    staleTime: minutesToMilliseconds(5) // Cache for 5 minutes
  });
};