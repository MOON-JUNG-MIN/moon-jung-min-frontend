import { useEffect } from 'react';
import { useLogin } from '../apis/user';

const Main = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const { mutate } = useLogin({
    code: code || '',
    device_token: 'mdmdmdmd',
  });
  useEffect(() => {
    if (code && !localStorage.getItem('access_token')) {
      console.log(code);
      mutate();
    }
  }, [code]);
  return (
    <>
      <a href="https://accounts.google.com/o/oauth2/auth?client_id=465541274089-u777afbuec9desm0p4uu4qm1b8um0mcb.apps.googleusercontent.com&redirect_uri=http://localhost:3000&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email">
        로그인
      </a>
    </>
  );
};

export default Main;
