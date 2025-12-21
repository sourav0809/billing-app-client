import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth.api';
import { setCredentials } from '@/lib/store/slices/authSlice';
import type { LoginDto } from '../types/auth.types';

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
      navigate('/dashboard');
    },
  });
};

