import { Button, Input, TextareaAutosize, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { Bucket, createBucket } from 'renderer/apis/bucket';
import { useImage } from 'renderer/apis/image';
import styled from 'styled-components';

export default function WritePage() {
  const [bucket, setBucket] = useState<Bucket>({
    title: '',
    content: '',
    target_date: '',
    image: '',
  });
  const { uploadImage, images } = useImage();

  useEffect(() => {
    if (images)
      setBucket({
        ...bucket,
        image: images,
      });
  }, [images]);
  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBucket({
      ...bucket,
      [e.target.name]: e.target.value,
    });
  };
  const create = () => {
    createBucket(bucket);
  };

  return (
    <Wrapper>
      <Typography variant="h3" color="#0288d1" style={{ textAlign: 'center' }}>
        버킷 생성하기
      </Typography>
      <Typography variant="body1" style={{ marginTop: '80px' }}>
        제목
      </Typography>
      <Input
        placeholder="버킷의 제목을 입력해 주세요."
        onChange={handleInput}
        name="title"
        value={bucket.title}
      />
      <Typography variant="body1">내용</Typography>
      <TextArea
        placeholder="버킷의 내용을 입력해 주세요."
        maxRows={8}
        onChange={handleInput}
        name="content"
        value={bucket.content}
      />
      <Typography variant="body1">목표기한</Typography>
      <Input type="date" onChange={handleInput} name="target_date" />
      <Input type="file" onChange={uploadImage} name="image" />
      {bucket.image && <img src={bucket.image} alt="미리보기 이미지" />}
      <Button
        variant="contained"
        onClick={create}
        style={{ marginTop: '20px' }}
      >
        생성하기
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 100px;
  > div,
  textarea {
    margin: 4px 0 24px 0;
  }
`;

const TextArea = styled(TextareaAutosize)`
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.42) !important;
  outline: none;
  font: inherit;
  resize: none;
`;
