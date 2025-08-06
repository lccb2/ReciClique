import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
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
  CarouselArrow,
} from "./style";

import NewCommentModal from "../NewCommentModal";
import CommentViewer from "../CommentViewer";
import { Comment } from "../../types/comment";
import OptionsModal from "../OptionsModal";
import DeletePostModal from "../DeletePostModal";
import EditPostModal from "../EditPostModal";
import DefaultPhoto from "../../../public/img/default.jpg";
import { baseURL } from "api/base";

import {
  FaHeart,
  FaRegHeart,
  FaRegCommentDots,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { InteractionButton } from "components/CommentViewer/style";
import {
  createComment,
  getPostComments,
  likePost,
  unlikePost,
} from "api/comment";
import { getPost } from "api/post";

interface PostProps {
  userPhoto: any;
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
  comments?: Comment[];
  onDelete?: () => void;
  onLike?: () => void;
  onLikeUpdate?: (postId: number, isLiked: boolean) => void;
  onCommentUpdate?: (postId: number) => void;
  currentIndex: number;
  onNavigate: (newIndex: number) => void;
  onEdit?: () => void;
  post: any;
  deletePost: () => void;
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
  comments: initialComments = [],
  onEdit,
  onDelete,
  deletePost,
  post,
  onLikeUpdate,
  onCommentUpdate,
}: PostProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [liked, setLiked] = useState(initialLiked);
  const [likes, setLikes] = useState(initialLikes ?? 0);
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comments, setComments] = useState<[]>([]);

  const router = useRouter();

  const [userId, setUserId] = useState(Number(localStorage.getItem("user_id")));

  const [currentPost, setCurrentPost] = useState(post);

  const handleIsLiked = () => {
    const userIdFromLocalStorage = Number(localStorage.getItem("user_id"));
    setUserId(userIdFromLocalStorage);
    const isLikedByUser = post?.post_likes?.find(
      (like: any) => like.user_id === userIdFromLocalStorage
    );

    setLiked(isLikedByUser);
  };

  const fetchComments = async () => {
    try {
      const response = await getPostComments(post.id);
      setComments(response);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    handleIsLiked();
    fetchComments();
  }, []);

  const handleLikePost = async () => {
    if (liked) {
      await unlikePost(post.id);
      const updatedPost = await getPost(post.id);

      setCurrentPost(updatedPost);
      setLikes(updatedPost.post_likes.length);

      setLiked(false);

      onLikeUpdate?.(post.id, false);
    } else {
      await likePost(post.id);

      const updatedPost = await getPost(post.id);

      setCurrentPost(updatedPost);

      setLikes(updatedPost.post_likes.length);
      setLiked(true);
      onLikeUpdate?.(post.id, true);
    }
  };

  const photos = useMemo(() => {
    const list = Array.isArray(projectPhoto) ? projectPhoto : [projectPhoto];
    return list.filter((p): p is string => typeof p === "string" && !!p);
  }, [projectPhoto]);

  const getProjectPhoto = (photo: string) => `${baseURL}/uploads/${photo}`;

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + projectPhoto.length) % projectPhoto.length
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectPhoto.length);
  };

  const handleCreateComment = async (postId: number, comment: string) => {
    try {
      await createComment(postId, comment);
      await fetchComments();
      onCommentUpdate?.(postId);
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <>
      {currentPost && photos && photos.length && userId && (
        <CardContainer>
          <ContentWrapper>
            <LeftContent>
              <HeaderRow>
                <UserInfo>
                  <UserPhoto>
                    <Image
                      src={userPhoto}
                      alt={userName}
                      width={50}
                      height={50}
                    />
                  </UserPhoto>
                  <UserNameDate
                    onClick={() =>
                      router.push(`/galeria/${currentPost.user_id}`)
                    }
                  >
                    <strong>{userName}</strong>
                    <DateTime>{dateTime}</DateTime>
                  </UserNameDate>
                </UserInfo>

                {currentPost.user_id === userId && (
                  <Actions>
                    <ActionButton
                      onClick={() => setMenuOpen(!menuOpen)}
                      title="Mais opções"
                    >
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
                )}
              </HeaderRow>

              <ProjectTitle>{projectTitle}</ProjectTitle>
              <ProjectDescription>{projectDescription}</ProjectDescription>

              <SectionTitle>Materiais Utilizados:</SectionTitle>
              <SectionText>{materials}</SectionText>

              <SectionTitle>Tutorial:</SectionTitle>
              <TutorialLink
                href={tutorialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Acesse o tutorial aqui
              </TutorialLink>

              <IconsRow>
                <InteractionButton onClick={handleLikePost} active={liked}>
                  {liked ? <FaHeart /> : <FaRegHeart />}
                  <span>{likes}</span>
                </InteractionButton>

                {/* <InteractionButton onClick={handleDislikePost} active={disliked}>
                  <FaThumbsDown />
                  <span>{dislikes}</span>
                </InteractionButton> */}

                <IconButton
                  title="Comentários"
                  onClick={() => setShowCommentModal(true)}
                >
                  <FaRegCommentDots />
                </IconButton>
              </IconsRow>
            </LeftContent>

            <RightContent>
              <ProjectImageWrapper>
                <CarouselArrow onClick={handlePrevImage}>
                  <FaChevronLeft />
                </CarouselArrow>
                <ProjectImage>
                  <Image
                    src={
                      photos[currentImageIndex]
                        ? getProjectPhoto(photos[currentImageIndex])
                        : DefaultPhoto
                    }
                    alt={`${projectTitle} - imagem ${currentImageIndex + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </ProjectImage>
                <CarouselArrow onClick={handleNextImage}>
                  <FaChevronRight />
                </CarouselArrow>
              </ProjectImageWrapper>
            </RightContent>
          </ContentWrapper>

          {comments?.length > 0 && (
            <CommentViewer
              comments={comments}
              currentIndex={currentCommentIndex}
              onNavigate={setCurrentCommentIndex}
            />
          )}

          {showCommentModal && (
            <NewCommentModal
              onClose={() => setShowCommentModal(false)}
              onSubmit={(descricao) => {
                handleCreateComment(post.id, descricao);
                setShowCommentModal(false);
              }}
              isOpen={true}
            />
          )}

          {showEditModal && (
            <EditPostModal
              isOpen={showEditModal}
              onClose={() => setShowEditModal(false)}
              post={post}
            />
          )}

          {showDeleteModal && (
            <DeletePostModal
              isOpen={showDeleteModal}
              onClose={() => setShowDeleteModal(false)}
              onCancel={() => setShowDeleteModal(false)}
              onDelete={() => {
                setShowDeleteModal(false);
                deletePost();
              }}
            />
          )}
        </CardContainer>
      )}
    </>
  );
}
