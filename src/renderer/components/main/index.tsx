import { Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from 'renderer/apis/user';
import styled from 'styled-components';
import Background from '../../../../assets/main/title.png';

export default function Main() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const isLogin = !!localStorage.getItem('access_token');
  const { mutate } = useLogin({
    code: code || '',
    device_token: 'mdmdmdmd',
  });
  useEffect(() => {
    if (code && !localStorage.getItem('access_token')) {
      mutate();
    }
  }, [code, mutate]);
  return (
    <Wrapper>
      <Typography color="#0288d1" variant="h1" fontWeight="400">
        버킷 메이트
      </Typography>
      <Button variant="contained" size="large" type="button" color="info">
        <Link
          to={
            isLogin
              ? '/cardview'
              : 'https://accounts.google.com/o/oauth2/auth?client_id=465541274089-u777afbuec9desm0p4uu4qm1b8um0mcb.apps.googleusercontent.com&redirect_uri=http://localhost:3000&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email'
          }
        >
          시작하기 / 로그인
        </Link>
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  position: relative;

  > button {
    margin-top: 60px;
    width: 200px;
  }
`;
