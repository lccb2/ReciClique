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
  ProjectImageWrapper,
  InteractionButton,
} from './style';

import NewPostModal from '../NewPostModal';
import CommentViewer from '../CommentViewer';
import { Comment } from '../../types/comment';

import {
  FaHeart,
  FaRegHeart,
  FaThumbsDown,
  FaRegCommentDots,
  FaEllipsisV,
} from 'react-icons/fa';

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
  likes: number;
  dislikes: number;
  comments: Comment[];
  onEdit?: () => void;
  onDelete?: () => void;
  onLike?: () => void;
  currentIndex: number;
  onNavigate: (newIndex: number) => void;
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
  liked: initialLiked,
  disliked: initialDisliked,
  likes: initialLikes,
  dislikes: initialDislikes,
  comments: initialComments,
  onEdit,
  onDelete,
}: PostProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [liked, setLiked] = useState(initialLiked);
  const [disliked, setDisliked] = useState(initialDisliked);
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [comments, setComments] = useState(initialComments);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);


  const handleLikePost = () => {
    if (liked) {
      setLiked(false);
      setLikes((prev) => Math.max(prev - 1, 0));
    } else {
      setLiked(true);
      setLikes((prev) => prev + 1);
      if (disliked) {
        setDisliked(false);
        setDislikes((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const handleDislikePost = () => {
    if (disliked) {
      setDisliked(false);
      setDislikes((prev) => Math.max(prev - 1, 0));
    } else {
      setDisliked(true);
      setDislikes((prev) => prev + 1);
      if (liked) {
        setLiked(false);
        setLikes((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const handleCommentLike = (id: number) => {
    const updated = comments.map((comment) =>
      comment.id === id
        ? {
            ...comment,
            liked: !comment.liked,
            disliked: comment.liked ? comment.disliked : false,
          }
        : comment
    );
    setComments(updated);
  };

  const handleCommentDislike = (id: number) => {
    const updated = comments.map((comment) =>
      comment.id === id
        ? {
            ...comment,
            disliked: !comment.disliked,
            liked: comment.disliked ? comment.liked : false,
          }
        : comment
    );
    setComments(updated);
  };

  const handleAddComment = (newComment: Comment) => {
    setComments((prev) => [...prev, newComment]);
  };

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
            <InteractionButton onClick={handleLikePost} active={liked}>
              {liked ? <FaHeart /> : <FaRegHeart />}
              <span>{likes}</span>
            </InteractionButton>

            <InteractionButton onClick={handleDislikePost} active={disliked}>
              <FaThumbsDown />
              <span>{dislikes}</span>
            </InteractionButton>

            <IconButton title="Comentários" onClick={() => setShowCommentModal(true)}>
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

      {comments.length > 0 && (
        <CommentViewer
          comments={comments}
          onLike={handleCommentLike}
          onDislike={handleCommentDislike}
          currentIndex={currentCommentIndex}
          onNavigate={setCurrentCommentIndex}
        />

      )}

      {showCommentModal && (
        <NewPostModal
          onClose={() => setShowCommentModal(false)}
          onSubmit={(titulo: string, descricao: string, materiais: string, tutorial?: string) => {
            const newComment: Comment = {
              id: Date.now(),
              userPhoto: userPhoto,
              userName: userName,
              dateTime: new Date().toLocaleString(),
              text: descricao,
              liked: false,
              disliked: false,
              likes: 0,
              dislikes: 0,
            };
            handleAddComment(newComment);
            setShowCommentModal(false);
          } } isOpen={false}        />
      )}
    </CardContainer>
  );
}
