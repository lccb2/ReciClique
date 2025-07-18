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
  ProjectTitle,
  ProjectDescription,
  SectionTitle,
  SectionText,
  TutorialLink,
  IconsRow,
  IconButton,
  ProjectImage,
  ProjectImageWrapper,
  CarouselArrow
} from './style';

import NewCommentModal from '../NewCommentModal';
import CommentViewer from '../CommentViewer';
import { Comment } from '../../types/comment';
import OptionsModal from '../OptionsModal';
import DeletePostModal from '../DeletePostModal';
import EditPostModal from '../EditPostModal';

import {
  FaHeart,
  FaRegHeart,
  FaThumbsDown,
  FaRegCommentDots,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { InteractionButton } from 'components/CommentViewer/style';

interface PostProps {
  userPhoto: string;
  userName: string;
  dateTime: string;
  projectTitle: string;
  projectDescription: string;
  materials: string;
  tutorialLink: string;
  projectPhoto: string | string[];
  liked: boolean;
  disliked: boolean;
  likes: number;
  dislikes: number;
  comments?: Comment[]; // Tornou opcional
  onDelete?: () => void;
  onLike?: () => void;
  currentIndex: number;
  onNavigate: (newIndex: number) => void;
  onEdit?: () => void;
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
  likes: initialLikes = 0,
  dislikes: initialDislikes = 0,
  comments: initialComments = [], // Valor padrão
  onEdit,
  onDelete,
}: PostProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [liked, setLiked] = useState(initialLiked);
  const [disliked, setDisliked] = useState(initialDisliked);
  const [likes, setLikes] = useState(initialLikes ?? 0);
  const [dislikes, setDislikes] = useState(initialDislikes ?? 0);
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comments, setComments] = useState<Comment[]>(
    (initialComments ?? []).map((c) => ({
      ...c,
      likes: c.likes ?? 0,
      dislikes: c.dislikes ?? 0,
      liked: c.liked ?? false,
      disliked: c.disliked ?? false,
    }))
  );

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
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const isLiked = !c.liked;
          return {
            ...c,
            liked: isLiked,
            disliked: isLiked ? false : c.disliked,
            likes: isLiked ? (c.likes ?? 0) + 1 : Math.max((c.likes ?? 1) - 1, 0),
            dislikes: isLiked && c.disliked ? Math.max((c.dislikes ?? 1) - 1, 0) : c.dislikes,
          };
        }
        return c;
      })
    );
  };

  const handleCommentDislike = (id: number) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const isDisliked = !c.disliked;
          return {
            ...c,
            disliked: isDisliked,
            liked: isDisliked ? false : c.liked,
            dislikes: isDisliked ? (c.dislikes ?? 0) + 1 : Math.max((c.dislikes ?? 1) - 1, 0),
            likes: isDisliked && c.liked ? Math.max((c.likes ?? 1) - 1, 0) : c.likes,
          };
        }
        return c;
      })
    );
  };

  const handleAddComment = (newComment: Comment) => {
    setComments((prev) => [
      ...prev,
      {
        ...newComment,
        likes: 0,
        dislikes: 0,
        liked: false,
        disliked: false,
      },
    ]);
  };

  const photos = Array.isArray(projectPhoto) ? projectPhoto : [projectPhoto];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % photos.length);
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
                ⋮
              </ActionButton>
              {menuOpen && (
                <OptionsModal
                  isOpen={menuOpen}
                  onClose={() => setMenuOpen(false)}
                  onEdit={() => setShowEditModal(true)}
                  onDelete={() => setShowDeleteModal(true)}
                />
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
            <CarouselArrow onClick={handlePrevImage}><FaChevronLeft /></CarouselArrow>
            <ProjectImage>
              <Image
                src={photos[currentImageIndex]}
                alt={`${projectTitle} - imagem ${currentImageIndex + 1}`}
                fill
                style={{ objectFit: 'cover' }}
              />
            </ProjectImage>
            <CarouselArrow onClick={handleNextImage}><FaChevronRight /></CarouselArrow>
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
        <NewCommentModal
          onClose={() => setShowCommentModal(false)}
          onSubmit={(descricao) => {
            const newComment: Comment = {
              id: Date.now(),
              userPhoto,
              userName,
              dateTime: new Date().toLocaleString(),
              text: descricao,
              liked: false,
              disliked: false,
              likes: 0,
              dislikes: 0,
            };
            handleAddComment(newComment);
            setShowCommentModal(false);
          }}
          isOpen={true}
        />
      )}

      {showEditModal && (
        <EditPostModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeletePostModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onCancel={() => setShowDeleteModal(false)}
          onDelete={() => {
            setShowDeleteModal(false);
            onDelete?.();
          }}
        />
      )}
    </CardContainer>
  );
}