import { BucketItem } from 'atom/store';
import styled from 'styled-components';
import RecipeReviewCard from './card';
import { Link } from 'react-router-dom';
import { instance } from 'renderer/apis/axios';
import { useQuery } from 'react-query';
import { Button } from '@mui/material';

export default function CardView() {
  const { data } = useQuery(['getList'], () =>
    instance.get<{ bucket_list: BucketItem[] }>('/bucket')
  );

  return (
    <Wrapper
      style={{
        padding: '15px',
      }}
    >
      <Button
        variant="contained"
        style={{
          display: 'block',
          marginLeft: 'auto',
        }}
      >
        <Link to="/write">버킷 생성하기</Link>
      </Button>
      <CardGrid>
        {data?.data.bucket_list.map((value) => (
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
  padding: 15px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 36px;
`;

const GoBack = styled.img`
  border: 1px solid black;
  padding: 10px;
  margin: 5px;
  background-color: cornsilk;
  cursor: pointer;
`;
