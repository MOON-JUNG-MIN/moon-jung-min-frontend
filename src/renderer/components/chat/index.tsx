/* eslint-disable camelcase */
import { Avatar, Button } from '@mui/material';
import { LegacyRef, RefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { readChat, sendChat } from 'renderer/apis/chat';

interface Props {
  roomId: number;
}

interface ChatDataType {
  message_id: number;
  username: string;
  profile_image: string;
  message: string;
  date: string;
}

interface ChatType {
  room_id: number;
  room_name: string;
  data: ChatDataType[];
}

export default function Chat({ roomId }: Props) {
  const [inputData, setInputData] = useState('');
  const [chatData, setData] = useState<ChatType>();
  const Ref = useRef<LegacyRef<HTMLInputElement>>();
  const sendMessage = (message: string) => {
    sendChat(roomId, {
      message,
    });
  };

  useEffect(() => {
    const loop = setInterval(() => {
      // eslint-disable-next-line promise/catch-or-return, promise/always-return
      readChat(roomId).then((value) => {
        setData(value.data);
      });
    }, 100);
    return () => {
      clearInterval(loop);
    };
  }, []);
  return (
    <Wrapper>
      <ChatWrapper>
        {chatData?.data.map((value) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <ChatBox {...value} />
        ))}
        <div id="input">
          <input
            type="text"
            value={inputData}
            onChange={(e) => {
              setInputData(e.currentTarget.value);
            }}
          />
          <Button
            onClick={() => {
              sendMessage(inputData);
              setInputData('');
            }}
            variant="contained"
            size="large"
            type="button"
            color="info"
          >
            전송
          </Button>
        </div>
      </ChatWrapper>
    </Wrapper>
  );
}

function ChatBox({
  date,
  message,
  message_id,
  profile_image,
  username,
}: ChatDataType) {
  return (
    <ChatBoxWrapper>
      <div>
        <Avatar aria-label="recipe">
          <img src={profile_image} alt="" />
        </Avatar>
        {username}
      </div>
      <p>{message}</p>
    </ChatBoxWrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  > input {
    height: 30px;
  }
`;

const ChatWrapper = styled.div`
  border: 1px solid black;
  width: 300px;
  height: 500px;
  overflow-y: scroll;
  position: relative;
  #input {
    background-color: white;
    position: sticky;
    bottom: 0px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 420px;
    > input {
      width: 73%;
    }
  }
`;

const ChatBoxWrapper = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px;
  > div {
    display: flex;
    font-size: 18px;
    align-items: center;
    gap: 10px;
  }
  > p {
  }
`;
