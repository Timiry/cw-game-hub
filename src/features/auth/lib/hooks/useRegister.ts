import { useMutation } from "@tanstack/react-query";
import AuthService from "../../api/AuthService";

const useRegister = () => {
  const mutation = useMutation({
    mutationFn: AuthService.register,
  });

  return mutation;
};

export default useRegister;
