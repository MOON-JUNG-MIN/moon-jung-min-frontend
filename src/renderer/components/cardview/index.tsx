import styled from 'styled-components';
import RecipeReviewCard from './card';

export default function CardView() {
  return (
    <Wrapper>
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
