import { instance } from './axios';

export interface Bucket {
  title: string;
  content: string;
  image: string;
  target_date: string;
}

export const createBucket = (body: Bucket) => instance.post('/bucket', body);
