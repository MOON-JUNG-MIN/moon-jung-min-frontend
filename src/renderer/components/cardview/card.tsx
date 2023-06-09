/* eslint-disable camelcase */
import styled from '@emotion/styled';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  CardActions,
  Menu,
  MenuItem,
  Modal,
  Box,
  css,
  Input,
  Button,
} from '@mui/material';
import { BucketItem } from 'atom/store';
import { useState } from 'react';
import More from '../../../../assets/card/more.svg';
import { useMutation, useQuery } from 'react-query';
import { instance } from 'renderer/apis/axios';
import { useNavigate } from 'react-router-dom';
import Chat from '../chat';

export default function RecipeReviewCard(props: BucketItem) {
  const {
    content,
    id,
    image,
    is_end,
    members,
    start_date,
    target_date,
    title,
    room_id,
    room_name,
  } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  // eslint-disable-next-line no-undef
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const { refetch } = useQuery(['getList'], () =>
    instance.get<{ bucket_list: BucketItem[] }>('/bucket')
  );

  const { mutate: complete } = useMutation(
    () => instance.put('/bucket/end/' + id),
    {
      onSuccess: () => refetch(),
    }
  );

  const onClickComplete = () => {
    complete();
  };
  const { mutate: deleteBucket } = useMutation(
    () => instance.delete('/bucket/' + id),
    {
      onSuccess: () => refetch(),
    }
  );

  const [inputOpen, setInputOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const { mutate: invite } = useMutation(
    () =>
      instance.post('/member/' + id, {
        email: inviteEmail,
      }),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Modalstyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography
            component="h3"
            sx={{ color: 'gray' }}
            style={{
              marginTop: '4px',
            }}
          >
            {start_date} ~ {target_date}
          </Typography>
          <form onSubmit={(e) => e.preventDefault()}>
            {inputOpen && (
              <Input
                onChange={(e) => setInviteEmail(e.target.value)}
                value={inviteEmail}
                style={{
                  width: '300px',
                }}
              />
            )}
            <Button
              onClick={() => {
                if (!inputOpen) setInputOpen(true);
                else {
                  invite();
                }
              }}
            >
              친구 초대하기
            </Button>
          </form>
          <Typography
            component="pre"
            id="modal-modal-description"
            sx={{ mt: 2, wordBreak: 'break-word' }}
            style={{
              marginTop: '12px',
              whiteSpace: 'pre-wrap',
              overflow: 'auto',
            }}
          >
            {content}
          </Typography>
          <img
            src={image}
            alt=""
            style={{
              width: '100%',
              border: '1px solid black',
              marginTop: '50px',
            }}
            style={{ width: '100%', marginTop: '12px' }}
          />
          <Chat roomId={room_id} />
        </Box>
      </Modal>
      <BucketCard
        isEnd={is_end}
        sx={{
          maxWidth: 345,
          width: '100%',
          cursor: 'pointer',
        }}
        onClick={() => {
          handleModalOpen();
        }}
      >
        <EndText className="endText">완료</EndText>
        <CardHeader
          action={
            <>
              <IconButton
                aria-label="settings"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(e);
                }}
              >
                <MoreButton>
                  <img src={More} alt="" />
                </MoreButton>
              </IconButton>
              <Menu
                onClick={(e) => {
                  e.stopPropagation();
                }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose;
                    navigate('/patch?id=' + id);
                  }}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose;
                    deleteBucket();
                  }}
                >
                  Delete
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose;
                    onClickComplete();
                  }}
                >
                  Complete
                </MenuItem>
              </Menu>
            </>
          }
          title={title}
          subheader={`마감 기한 : ${target_date}`}
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              paddingRight: '10px',
              overflow: 'hidden',
            }}
          >
            {content}
          </Typography>
        </CardContent>
        <CardActions>
          <Members>
            <p>참여자 명단</p>
            <div>
              {members.map((value) => (
                <Avatar key={value.nickname}>
                  <img
                    src={value.image}
                    alt={value.nickname}
                    width={40}
                    height={40}
                  />
                </Avatar>
              ))}
            </div>
          </Members>
        </CardActions>
      </BucketCard>
    </>
  );
}

const BucketCard = styled(Card)<{
  isEnd: boolean;
}>`
  position: relative;
  ${(props) =>
    props.isEnd &&
    css`
      background-color: rgba(0, 0, 0, 0.4);
      .endText {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
        color: white;
        font-weight: bold;
      }
    `}
`;

const EndText = styled.p`
  display: none;
`;

const Members = styled.div`
  border-top: 1px solid lightgray;
  padding: 8px;
  width: 100%;
  gap: 10px;
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  > p {
    font-size: 11px;
  }
`;

const MoreButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

const Modalstyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  minHeight: 400,
  maxHeight: '80%',
  overflowY: 'scroll',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};
