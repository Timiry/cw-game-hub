import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService from "../../api/AuthService";

const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      queryClient.clear();
      localStorage.removeItem("cwg:servers");
    },
  });
};

export default useLogout;
