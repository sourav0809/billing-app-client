import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth.api";
import { setCredentials } from "@/lib/store/slices/authSlice";
import type { LoginDto } from "../types/auth.types";
import { toast } from "sonner";
import type { AxiosError } from "axios";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginDto) => authApi.login(data),
    onSuccess: (response) => {
      dispatch(
        setCredentials({
          user: response.user,
          token: response.token,
        })
      );
      navigate("/dashboard");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Login failed. Please check your credentials and try again."
      );
    },
  });
};
