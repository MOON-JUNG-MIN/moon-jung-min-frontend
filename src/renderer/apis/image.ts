import { ChangeEvent, useState } from 'react';
import { instance } from './axios';

interface ImageResponse {
  images: string[];
}

export const useImage = () => {
  const [images, setImages] = useState<string>('');

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!(e.target.files && e.target.files[0])) return;
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append('files', file);
    instance.post<ImageResponse>('/image', fd).then((res) => {
      setImages(res.data.images[0]);
    });
  };

  return {
    uploadImage,
    images,
  };
};
