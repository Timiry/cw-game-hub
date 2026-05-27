import { useQuery } from "@tanstack/react-query";
import UserService from "../../api";
import { QueryKeys } from "@/shared/lib/api/QueryKeys";
import type { HubError } from "@/shared/lib/api/HubError";

export const useUser = () => {
  return useQuery<Awaited<ReturnType<typeof UserService.getUser>>, HubError>({
    queryKey: [QueryKeys.User],
    queryFn: UserService.getUser,
  });
};

export default useUser;
