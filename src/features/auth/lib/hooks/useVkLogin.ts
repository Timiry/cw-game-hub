import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService from "../../api/AuthService";
import { QueryKeys } from "@/shared/lib/api/QueryKeys";

const useVkLogin = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: AuthService.vkLogin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.UserProfile] });
    },
  });

  return mutation;
};

export default useVkLogin;
