import { useEffect, useState } from "react";
import Image from "next/image";
import { Container, MainContent, Divisor, TopBar } from "./style";

import { SideBar } from "../../components";
import Postagem from "../../components/Postagem";
import { Logo, ProfileIcon } from "../../assets";
import SearchModal from "../../components/SearchModal";
import NewPostModal from "../../components/NewPostModal";
import { Comment } from "../../types/comment";
import { getRecentPosts } from "api/post";
import { getUser } from "api/user";
import { searchPostByMaterial } from "api/pesq";

export default function TelaInicial() {
  const [user, setUser] = useState<any | null>(null);
  const [postagens, setPostagens] = useState<any[]>([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedMateriais, setSelectedMateriais] = useState<number[]>([]);

  const fetchUser = async () => {
    try {
      const userId = Number(localStorage.getItem("user_id"));
      const user = await getUser(userId);

      setUser(user as any);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const fetchPostagens = async () => {
    const res = await getRecentPosts();
    setPostagens(res);
  };

  const handlePostCreated = () => {
    fetchPostagens();
  };

  const handleLikeUpdate = async (postId: number, isLiked: boolean) => {
    try {
      await fetchPostagens();
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleCommentUpdate = async (postId: number) => {
    try {
      await fetchPostagens();
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchUser();
    fetchPostagens();
  }, []);

  const handleFilterByMaterial = async (materiais: number[]) => {
    try {
      const response = await searchPostByMaterial(materiais);

      console.log(response, "response");
      setPostagens([...response]);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleNovaPostagem = (
    titulo: string,
    descricao: string,
    materiais: string,
    tutorial?: string
  ) => {
    const novaPostagem = {
      titulo,
      descricao,
      materiais,
      tutorial,
      imagens: [],
      usuario: "Você",
      data: new Date().toISOString(),
    };

    setPostagens((prev) => [novaPostagem, ...prev]);
  };
  {
    /* Mock de comentários para a postagem */
  }
  const comentariosMock: Comment[] = [
    {
      id: 1,
      userPhoto: "/img/ProfileIcon.png",
      userName: "Caio",
      dateTime: "17/07/2025 ás 15:00",
      text: "Lindo Lo! Tu arrasa!",
      likes: 3,
      dislikes: 0,
      liked: false,
      disliked: false,
    },
  ];

  return (
    <>
      {user && (
        <Container>
          <SideBar />

          <MainContent>
            <TopBar>
              <div className="logo-wrapper">
                <Image src={Logo} alt="logo" width={49} height={53} />
                <span className="logo-text">ReciClique</span>
              </div>

              <div className="search">
                <SearchModal
                  onSearch={handleFilterByMaterial}
                  selected={selectedMateriais}
                  setSelected={setSelectedMateriais}
                />
              </div>

              <button
                className="postagem"
                onClick={() => setShowPostModal(true)}
              >
                + Nova Postagem
              </button>
            </TopBar>

            <NewPostModal
              isOpen={showPostModal}
              onClose={() => setShowPostModal(false)}
              onPostCreated={handlePostCreated}
            />

            <Divisor />

            {postagens.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  marginTop: "2rem",
                  color: "#888",
                }}
              >
                {selectedMateriais.length > 0
                  ? "Nenhuma postagem encontrada com os materiais selecionados."
                  : "Nenhuma postagem encontrada."}
              </p>
            ) : (
              postagens.map((postagem, index) => (
                <div key={index}>
                  <Postagem
                    userPhoto={user.photo || "/img/default.jpg"}
                    userName={user.name}
                    dateTime={postagem.created_at}
                    projectTitle={postagem.title}
                    projectDescription={postagem.description}
                    materials={postagem.post_materiais
                      .map((post_material: any) => post_material.material.name)
                      .join(", ")}
                    tutorialLink={postagem.link}
                    projectPhoto={[
                      postagem.photo,
                      postagem.photo_2,
                      postagem.photo_3,
                    ]}
                    liked={postagem.post_likes?.find(
                      (like: any) => like.user_id === user.id
                    )}
                    disliked={false}
                    likes={10}
                    dislikes={2}
                    comments={postagem.comments}
                    post={postagem}
                    currentIndex={index}
                    onNavigate={() => {}}
                    deletePost={() => {}}
                    onLikeUpdate={handleLikeUpdate}
                    onCommentUpdate={handleCommentUpdate}
                  />
                </div>
              ))
            )}
          </MainContent>
        </Container>
      )}
    </>
  );
}
