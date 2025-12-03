import { useQuery } from "@tanstack/react-query";
import ProfileService from "../../api";
import { QueryKeys } from "@/shared/lib/api/QueryKeys";
import { HubError } from "@/shared/lib/api/HubError";

export const useUserProfile = () => {
  return useQuery<Awaited<ReturnType<typeof ProfileService.getUserProfile>>, HubError>({
    queryKey: [QueryKeys.UserProfile],
    queryFn: ProfileService.getUserProfile,
  });
};

export default useUserProfile;
