import styled from 'styled-components';
import RecipeReviewCard from './card';
import { Link } from 'react-router-dom';

export default function CardView() {
  return (
    <Wrapper>
      <Link to="/write">글쓰러 가기</Link>
      <CardGrid>
        <RecipeReviewCard />
      </CardGrid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const CardGrid = styled.div`
  padding: 15px;
`;
