import { instance } from './axios';

// eslint-disable-next-line import/prefer-default-export
export const readChat = (roomId: number) => instance.get(`/room/${roomId}`);

interface Body {
  message: string;
}

export const sendChat = (roomId: number, body: Body) =>
  instance.post(`/room/${roomId}`, body);
