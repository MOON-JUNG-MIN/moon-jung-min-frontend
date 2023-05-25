import { QueryClient, QueryClientProvider } from 'react-query';
import TitleBar from 'components/titlebar';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { GlobalStyle } from 'style/GlobalStyle';
import styled from 'styled-components';
import { RecoilRoot } from 'recoil';
import Main from './components/main';
import CardView from './components/cardview';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: 5000,
    },
  },
});

export default function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <GlobalStyle />
        <MemoryRouter>
          <TitleBar />
          <Body>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/cardview" element={<CardView />} />
            </Routes>
          </Body>
        </MemoryRouter>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

const Body = styled.div`
  border-radius: 0 0 10px 10px;
  height: calc(100vh - 30px);
  overflow-y: auto;
  background-color: white;
  ::-webkit-scrollbar {
    width: 15px;
  }
  ::-webkit-scrollbar-corner {
    background: rgba(0, 0, 0, 0);
  }
  ::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: content-box;
    min-width: 32px;
    min-height: 32px;
  }
  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
`;
