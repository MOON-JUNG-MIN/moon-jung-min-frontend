import { Button } from '@mui/material';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Client } from '@stomp/stompjs';

interface Props {
  roomId: number;
}

const socketClient = new Client({
  brokerURL: 'ws://bucket-mate-moon.p-e.kr:8081/ws/chat',
  connectHeaders: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    roomId: '7',
  },
  debug(str) {
    console.log(str);
  },
  reconnectDelay: 5000, // 자동 재 연결
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

socketClient.onConnect = function (frame) {
  console.log(frame);
};

socketClient.onStompError = function (frame) {
  console.log(`Broker reported error: ${frame.headers.message}`);
  console.log(`Additional details: ${frame.body}`);
};

socketClient.activate();

export default function Chat({ roomId }: Props) {
  const sendMessage = () => {
    socketClient.publish({
      destination: `/app/chat/message/${roomId}`,
      body: JSON.stringify({
        message: 'assd',
      }),
    });
  };

  useEffect(() => {
    const subscription = socketClient.subscribe(
      `/topic/chat/room/${roomId}`,
      (message) => {
        console.log('Received : ', message);
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  }, [roomId]);
  const chatArr: string[] = [];
  return (
    <Wrapper>
      {chatArr.map((value) => (
        <p>{value}</p>
      ))}
      <input type="text" />
      <Button onClick={() => sendMessage()}>전송</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;
