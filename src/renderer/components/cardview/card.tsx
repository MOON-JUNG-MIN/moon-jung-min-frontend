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
} from '@mui/material';
import { BukkitType } from 'atom/store';
import { useState } from 'react';
import More from '../../../../assets/card/more.svg';

export default function RecipeReviewCard(props: BukkitType) {
  const {
    content,
    id,
    image,
    is_end,
    members,
    start_date,
    target_date,
    title,
  } = props;
  const [openMenu, setOpenMenu] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // eslint-disable-next-line no-undef
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ maxWidth: 345, width: 300 }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <img src={image} alt="" />
          </Avatar>
        }
        action={
          <>
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreButton>
                <img src={More} alt="" />
              </MoreButton>
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Edit</MenuItem>
              <MenuItem onClick={handleClose}>Delete</MenuItem>
              <MenuItem onClick={handleClose}>Complete</MenuItem>
            </Menu>
          </>
        }
        title={title}
        subheader={`마감 기한 : ${target_date}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Members>
          <p>참여자 명단</p>
          <div>
            {members.map((value) => (
              <Avatar>
                <img src={value.image} alt={value.nickname} />
              </Avatar>
            ))}
          </div>
        </Members>
      </CardActions>
    </Card>
  );
}

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
