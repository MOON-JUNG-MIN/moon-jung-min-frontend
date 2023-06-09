import { useRecoilState } from 'recoil';
import { BucketItem, bukkitState } from 'atom/store';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { instance } from 'renderer/apis/axios';
import RecipeReviewCard from './card';

export default function CardView() {
  const [state, setState] = useRecoilState<BucketItem[]>(bukkitState);
  console.log(state);
  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    instance
      .get<{ bucket_list: BucketItem[] }>('/bucket')
      .then((res) => setState(res.data.bucket_list));
  }, [setState]);

  return (
    <Wrapper>
      <Link to="/write">버킷 생성하기</Link>
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
            room_id={value.room_id}
            room_name={value.room_name}
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
