import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Main() {
  const router = useNavigate();
  return (
    <Wrapper>
      <Typography variant="h1">문 정 민</Typography>
      <Button
        variant="contained"
        size="large"
        type="button"
        color="info"
        onClick={() => router('/cardview')}
      >
        시작하기 / 로그인
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
  align-items: center;
  justify-content: center;
  background-color: white;
`;
