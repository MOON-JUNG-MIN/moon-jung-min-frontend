import { QueryClient, QueryClientProvider } from 'react-query';
import TitleBar from 'components/titlebar';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { GlobalStyle } from 'style/GlobalStyle';
import styled from 'styled-components';
import Main from './components/main';
import CardView from './components/cardview';
import WritePage from './pages/Write';

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
    <>
      <QueryClientProvider client={client}>
        <GlobalStyle />
        <MemoryRouter>
          <TitleBar />
          <Body>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/cardview" element={<CardView />} />
              <Route path="/write" element={<WritePage />} />
            </Routes>
          </Body>
        </MemoryRouter>
      </QueryClientProvider>
    </>
  );
}

const Body = styled.div`
  border-radius: 0 0 10px 10px;
  height: calc(100vh - 30px);
  background-color: white;
`;
