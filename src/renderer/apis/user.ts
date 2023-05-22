import { useMutation } from 'react-query';
import { instance } from './axios';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  code: string;
  device_token: string;
}

export const useLogin = (body: LoginProps) => {
  const router = useNavigate();
  return useMutation(() => instance.post('/user/login', body), {
    onSuccess: (res) => {
      localStorage.setItem('access_token', res.data.access_token);
      router('/cardview');
    },
  });
};
