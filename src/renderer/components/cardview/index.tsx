import { useRecoilState } from 'recoil';
import { bukkitState } from 'atom/store';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import RecipeReviewCard from './card';
import Back from '../../../../assets/back.svg';

export default function CardView() {
  const [state, setState] = useRecoilState(bukkitState);
  return (
    <Wrapper>
      <CardGrid>
        {state.map((value, index) => (
          <RecipeReviewCard
            key={value.id}
            id={value.id}
            title={value.title}
            content={value.content}
            image={value.image}
            target_date={value.target_date}
            is_end={value.is_end}
            start_date={value.start_date}
            members={value.members}
          />
        ))}
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
  display: flex;
  flex-wrap: wrap;
  gap: 36px;
`;

const GoBack = styled.img`
  border: 1px solid black;
  padding: 10px;
  margin: 5px;
  background-color: cornsilk;
  cursor: pointer;
`;
