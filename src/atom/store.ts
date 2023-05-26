import { atom } from 'recoil';

export type BukkitType = {
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
};

export const bukkitState = atom<BukkitType[]>({
  key: 'bukkitState', // unique ID (with respect to other atoms/selectors)
  default: [
    {
      id: 1,
      title: 'string',
      content: 'string',
      image: 'string',
      target_date: 'string', // YYYY-MM-DD
      is_end: false,
      start_date: 'string',
      members: [
        {
          nickname: 'string',
          image: 'string',
        },
      ],
    },

    {
      id: 1,
      title: 'string',
      content: 'string',
      image: 'string',
      target_date: 'string', // YYYY-MM-DD
      is_end: false,
      start_date: 'string',
      members: [
        {
          nickname: 'string',
          image: 'string',
        },
      ],
    },
    {
      id: 1,
      title: 'string',
      content: 'string',
      image: 'string',
      target_date: 'string', // YYYY-MM-DD
      is_end: false,
      start_date: 'string',
      members: [
        {
          nickname: 'string',
          image: 'string',
        },
      ],
    },
    {
      id: 1,
      title: 'string',
      content: 'string',
      image: 'string',
      target_date: 'string', // YYYY-MM-DD
      is_end: false,
      start_date: 'string',
      members: [
        {
          nickname: 'string',
          image: 'string',
        },
      ],
    },
    {
      id: 1,
      title: 'string',
      content: 'string',
      image: 'string',
      target_date: 'string', // YYYY-MM-DD
      is_end: false,
      start_date: 'string',
      members: [
        {
          nickname: 'string',
          image: 'string',
        },
      ],
    },
    {
      id: 1,
      title: 'string',
      content: 'string',
      image: 'string',
      target_date: 'string', // YYYY-MM-DD
      is_end: false,
      start_date: 'string',
      members: [
        {
          nickname: 'string',
          image: 'string',
        },
      ],
    },
    {
      id: 1,
      title: 'string',
      content: 'string',
      image: 'string',
      target_date: 'string', // YYYY-MM-DD
      is_end: false,
      start_date: 'string',
      members: [
        {
          nickname: 'string',
          image: 'string',
        },
      ],
    },
  ], // default value (aka initial value)
});
