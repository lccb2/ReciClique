import React, { useState } from 'react';
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

type Props = {
  comments: Comment[];
  currentIndex: number;
  onNavigate: (newIndex: number) => void;
  onLike?: (id: number) => void;
  onDislike?: (id: number) => void;
};

export default function CommentViewer({ comments, currentIndex, onNavigate }: Props) {
  if (comments.length === 0) return null;

  const [localComments, setLocalComments] = useState(comments);

  const comment = localComments[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === localComments.length - 1;

  const handleLike = () => {
    const updated = [...localComments];
    const current = { ...updated[currentIndex] };

    if (current.liked) {
      current.likes -= 1;
      current.liked = false;
    } else {
      current.likes += 1;
      current.liked = true;

      if (current.disliked) {
        current.dislikes -= 1;
        current.disliked = false;
      }
    }

    updated[currentIndex] = current;
    setLocalComments(updated);
  };

  const handleDislike = () => {
    const updated = [...localComments];
    const current = { ...updated[currentIndex] };

    if (current.disliked) {
      current.dislikes -= 1;
      current.disliked = false;
    } else {
      current.dislikes += 1;
      current.disliked = true;

      if (current.liked) {
        current.likes -= 1;
        current.liked = false;
      }
    }

    updated[currentIndex] = current;
    setLocalComments(updated);
  };

  return (
    <CommentBox>
      <Header>
        <Avatar src={comment.userPhoto} alt="Avatar" />
        <NameDate>
          <Name>{comment.userName}</Name>
          <DateText>{comment.dateTime}</DateText>
        </NameDate>
      </Header>

      <Text>{comment.text}</Text>

      <Bottom>
        <IconsRow>
          <InteractionButton onClick={handleLike} active={comment.liked}>
            {comment.liked ? <FaHeart /> : <FaRegHeart />}
            <span>{comment.likes}</span>
          </InteractionButton>

          <InteractionButton onClick={handleDislike} active={comment.disliked}>
            <FaThumbsDown />
            <span>{comment.dislikes}</span>
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
