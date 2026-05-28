import { getAdminUsers } from "../../services/users.service";
import { useQuery } from "@tanstack/react-query";
import { adminUserKeys } from "./queryKeys";

export function useAdminUsers() {
  return useQuery({
    queryKey: adminUserKeys.list(),
    queryFn: getAdminUsers,
  });
}