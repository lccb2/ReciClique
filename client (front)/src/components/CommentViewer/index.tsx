import React from 'react';
import {
  CommentBox,
  Header,
  Avatar,
  NameDate,
  Name,
  DateText,
  Text,
  Bottom,
  NavButtons,
  NavButton,
  IconsRow,
  InteractionButton
} from './style';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FaHeart, FaRegHeart, FaThumbsDown } from 'react-icons/fa';
import { Comment } from '../../types/comment';
import { baseURL } from 'api/base';

type Props = {
  comments: any[];
  currentIndex: number;
  onNavigate: (newIndex: number) => void;
  onLike?: (id: number) => void;
  onDislike?: (id: number) => void;
};

export default function CommentViewer({
  comments,
  currentIndex,
  onNavigate,
  onLike,
  onDislike,
}: Props) {
  if (comments.length === 0) return null;

  const comment = comments[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === comments.length - 1;

  return (
    <CommentBox>
      <Header>
        <Avatar src={`${baseURL}/uploads/${comment.user.photo}`} alt="Avatar" />
        <NameDate>
          <Name>{comment.userName}</Name>
          <DateText>{comment.dateTime}</DateText>
        </NameDate>
      </Header>

      <Text>{comment.text}</Text>

      <Bottom>
        <IconsRow>
          <InteractionButton onClick={() => onLike?.(comment.id)} active={comment.liked}>
            {comment.liked ? <FaHeart /> : <FaRegHeart />}
            <span>{comment.likes ?? 0}</span>
          </InteractionButton>

          <InteractionButton onClick={() => onDislike?.(comment.id)} active={comment.disliked}>
            <FaThumbsDown />
            <span>{comment.dislikes ?? 0}</span>
          </InteractionButton>
        </IconsRow>

        <NavButtons>
          <NavButton onClick={() => onNavigate(currentIndex - 1)} disabled={isFirst}>
            <ArrowLeft />
          </NavButton>
          <NavButton onClick={() => onNavigate(currentIndex + 1)} disabled={isLast}>
            <ArrowRight />
          </NavButton>
        </NavButtons>
      </Bottom>
    </CommentBox>
  );
}
