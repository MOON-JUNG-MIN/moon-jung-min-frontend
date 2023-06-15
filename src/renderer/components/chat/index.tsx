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
    }, 400);
    return () => {
      clearInterval(loop);
    };
  }, []);
  return (
    <Wrapper>
      <ChatWrapper id="chat">
        {chatData?.data.map((value) => (
          <>
            <ChatBox {...value} />
          </>
        ))}
      </ChatWrapper>
      <div id="input">
        <input
          type="text"
          value={inputData}
          onChange={(e) => {
            setInputData(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage(e.currentTarget.value);
              setInputData('');
              setTimeout(() => {
                document.getElementById('chat').scrollTop =
                  document.getElementById('chat').scrollHeight;
              }, 500);
            }
          }}
        />
        <Button
          onClick={() => {
            sendMessage(inputData);
            setInputData('');
            setTimeout(() => {
              document.getElementById('chat').scrollTop =
                document.getElementById('chat').scrollHeight;
            }, 500);
          }}
          variant="contained"
          size="large"
          type="button"
          color="info"
        >
          전송
        </Button>
      </div>
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
      <div>{username}</div>
      <p>{message}</p>
    </ChatBoxWrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 100px;
  display: flex;
  width: 100%;
  height: 300px;
  flex-direction: column;
  #input {
    > input {
      width: 87%;
    }
    background-color: white;
    bottom: 0px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

const ChatWrapper = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 500px;
  overflow-y: scroll;
  position: relative;
`;

const ChatBoxWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid gray;
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
