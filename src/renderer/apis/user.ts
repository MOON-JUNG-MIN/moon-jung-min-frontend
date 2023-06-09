import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { instance } from './axios';

interface LoginProps {
  code: string;
  device_token: string;
}

// eslint-disable-next-line import/prefer-default-export
export const useLogin = (body: LoginProps) => {
  const router = useNavigate();
  return useMutation(() => instance.post('/user/login', body), {
    onSuccess: (res) => {
      localStorage.setItem('access_token', res.data.access_token);
      router('/cardview');
    },
  });
};
