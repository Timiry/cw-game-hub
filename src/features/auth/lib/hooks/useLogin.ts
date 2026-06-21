import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService from "../../api/AuthService";
import { QueryKeys } from "@/shared/lib/api/QueryKeys";

const useLogin = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: AuthService.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.UserProfile] });
    },
  });

  return mutation;
};

export default useLogin;
