import TitleBar from 'components/titlebar';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { GlobalStyle } from 'style/GlobalStyle';
import styled from 'styled-components';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <MemoryRouter>
        <TitleBar />
        <Body>
          <Routes>
            <Route path="/" element={<>asdf</>} />
          </Routes>
        </Body>
      </MemoryRouter>
    </>
  );
}

const Body = styled.div`
  border-radius: 0 0 10px 10px;
  height: calc(100vh - 30px);
  background-color: white;
`;
