import { useMutation } from "@tanstack/react-query";
import AuthService from "../../api/AuthService";

const useLogin = () => {
  const mutation = useMutation({
    mutationFn: AuthService.login,
  });

  return mutation;
};

export default useLogin;
