import React, { useState } from 'react';
import Image from 'next/image';
import {
  CardContainer,
  ContentWrapper,
  LeftContent,
  RightContent,
  HeaderRow,
  UserInfo,
  UserPhoto,
  UserNameDate,
  DateTime,
  Actions,
  ActionButton,
  DropdownMenu,
  ProjectTitle,
  ProjectDescription,
  SectionTitle,
  SectionText,
  TutorialLink,
  IconsRow,
  IconButton,
  CommentsSection,
  CommentItem,
  CommentUserPhoto,
  CommentContent,
  CommentHeader,
  CommentDateTime,
  CommentText,
  CommentActions,
  ProjectImageWrapper,
} from './style';

import {
  FaHeart,
  FaRegHeart,
  FaThumbsDown,
  FaRegCommentDots,
  FaEllipsisV,
} from 'react-icons/fa';

interface Comment {
  id: number;
  userPhoto: string;
  userName: string;
  dateTime: string;
  text: string;
  liked: boolean;
  disliked: boolean;
}

interface PostProps {
  userPhoto: string;
  userName: string;
  dateTime: string;
  projectTitle: string;
  projectDescription: string;
  materials: string;
  tutorialLink: string;
  projectPhoto: string;
  liked: boolean;
  disliked: boolean;
  comments: Comment[];
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function Postagem({
  userPhoto,
  userName,
  dateTime,
  projectTitle,
  projectDescription,
  materials,
  tutorialLink,
  projectPhoto,
  liked,
  disliked,
  comments,
  onEdit,
  onDelete,
}: PostProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <CardContainer>
      <ContentWrapper>
        <LeftContent>
          <HeaderRow>
            <UserInfo>
              <UserPhoto>
                <Image src={userPhoto} alt={userName} width={50} height={50} />
              </UserPhoto>
              <UserNameDate>
                <strong>{userName}</strong>
                <DateTime>{dateTime}</DateTime>
              </UserNameDate>
            </UserInfo>

            <Actions>
              <ActionButton onClick={() => setMenuOpen(!menuOpen)} title="Mais opções">
                <FaEllipsisV />
              </ActionButton>
              {menuOpen && (
                <DropdownMenu>
                  <button onClick={onEdit}>✏️ Editar</button>
                  <button onClick={onDelete}>🗑️ Excluir</button>
                </DropdownMenu>
              )}
            </Actions>
          </HeaderRow>

          <ProjectTitle>{projectTitle}</ProjectTitle>
          <ProjectDescription>{projectDescription}</ProjectDescription>

          <SectionTitle>Materiais Utilizados:</SectionTitle>
          <SectionText>{materials}</SectionText>

          <SectionTitle>Tutorial:</SectionTitle>
          <TutorialLink href={tutorialLink} target="_blank" rel="noopener noreferrer">
            Acesse o tutorial aqui
          </TutorialLink>

          <IconsRow>
            <IconButton title="Curtir">
              {liked ? <FaHeart color="red" /> : <FaRegHeart />}
            </IconButton>
            <IconButton title="Não Curtir" style={{ marginLeft: 12 }}>
              <FaThumbsDown />
            </IconButton>
            <IconButton title="Comentários" style={{ marginLeft: 12 }}>
              <FaRegCommentDots />
            </IconButton>
          </IconsRow>
        </LeftContent>

        <RightContent>
          <ProjectImageWrapper>
            <Image
              src={projectPhoto}
              alt={projectTitle}
              fill
              style={{ objectFit: 'cover' }}
            />
          </ProjectImageWrapper>
        </RightContent>
      </ContentWrapper>

      {Array.isArray(comments) && comments.length > 0 && (
        <CommentsSection>
          {comments.map((comment) => (
            <CommentItem key={comment.id}>
                <CommentUserPhoto>
                  <Image src={comment.userPhoto} alt={comment.userName} width={40} height={40} />
                </CommentUserPhoto>

                <CommentContent>
                  <CommentHeader>
                    <strong>{comment.userName}</strong>
                    <CommentDateTime>{comment.dateTime}</CommentDateTime>
                  </CommentHeader>

                  <CommentText>{comment.text}</CommentText>

                  <CommentActions>
                    <IconButton title="Curtir">
                      {comment.liked ? <FaHeart color="red" /> : <FaRegHeart />}
                    </IconButton>
                    <IconButton title="Não Curtir" style={{ marginLeft: 10 }}>
                      <FaThumbsDown />
                    </IconButton>
                  </CommentActions>
                </CommentContent>
              </CommentItem>

          ))}
        </CommentsSection>
      )}
    </CardContainer>
  );
}
