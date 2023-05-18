import { useMutation } from 'react-query';
import { instance } from './axios';

interface LoginProps {
  code: string;
  device_token: string;
}

export const useLogin = (body: LoginProps) =>
  useMutation(() => instance.post('/user/login', body), {
    onSuccess: (res) => {
      localStorage.setItem('access_token', res.data.access_token);
    },
  });
