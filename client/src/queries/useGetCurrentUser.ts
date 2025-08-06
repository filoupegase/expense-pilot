import { useQuery } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/api";

export const userQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});

export const useGetCurrentUser = () => {
  return useQuery(userQueryOptions);
};
