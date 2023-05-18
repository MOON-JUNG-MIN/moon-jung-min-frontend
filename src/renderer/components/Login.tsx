import { Button, Input } from '@mui/material';
import styled from 'styled-components';

const LoginModal = () => {
  return (
    <Wrapper>
      <Button type="button" startIcon={<div>asd</div>} size="small">
        로그인
      </Button>
    </Wrapper>
  );
};

export default LoginModal;

const Wrapper = styled.section`
  width: 400px;
  height: 500px;
  position: absolute;
  z-index: 99;
  background-color: #ffffff;
  border-radius: 48px;
  border: 1px solid #bdbdbd;
  padding: 40px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
