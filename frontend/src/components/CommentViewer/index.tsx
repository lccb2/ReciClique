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
} from './style';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type Props = {
  comments: any[];
  currentIndex: number;
  onNavigate: (newIndex: number) => void;
};

// Function to format date to HH:mm dd/MM/YYYY
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year} às ${hours}:${minutes}`;
};

export default function CommentViewer({
  comments,
  currentIndex,
  onNavigate,
}: Props) {
  if (comments.length === 0) return null;

  const comment = comments[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === comments.length - 1;

  return (
    <CommentBox>
      <Header>
        <Avatar src={comment.user.photo} alt="Avatar" />
        <NameDate>
          <Name>{comment.user.name}</Name>
          <DateText>{formatDate(comment.created_at)}</DateText>
        </NameDate>
      </Header>

      <Text>{comment.text}</Text>

      <Bottom>
        <IconsRow>
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
