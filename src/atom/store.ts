import { atom } from 'recoil';

export interface BucketItem {
  id: number;
  title: string;
  content: string;
  image: string;
  target_date: string; // YYYY-MM-DD
  is_end: boolean;
  start_date: string;
  members: {
    nickname: string;
    image: string;
  }[];
}

export const bukkitState = atom<BucketItem[]>({
  key: 'bukkitState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
