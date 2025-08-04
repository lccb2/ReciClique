import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Container,
  MainContent,
  Header,
  Title,
  Divisor,
  UserInfo,
  CardsWrapper,
} from "./style";
import { SideBar } from "../../components";
import { ProfileIcon, Logo } from "../../assets";
import GalleryCard from "../../components/Postagem";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { getGaleria } from "api/galeria";
import { getUser } from "api/user";
import { deletePost } from "api/post";

export default function MinhaGaleria() {
  const [user, setUser] = useState<any | null>(null);
  const [galeria, setGaleria] = useState<any | []>([]);

  const fetchGaleria = async () => {
    try {
      const userId = Number(localStorage.getItem("user_id"));
      const userGaleria = await getGaleria(userId);

      setGaleria(userGaleria as any);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const fetchUser = async () => {
    try {
      const userId = Number(localStorage.getItem("user_id"));
      const user = await getUser(userId);

      setUser(user as any);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleDeletePost = async (postId: number) => {
    try {
      await deletePost(postId);

      fetchGaleria();
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleLikeUpdate = async (postId: number, isLiked: boolean) => {
    try {
      const userId = Number(localStorage.getItem("user_id"));
      const updatedGaleria = await getGaleria(userId);
      setGaleria(updatedGaleria as any);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleCommentUpdate = async (postId: number) => {
    try {
      const userId = Number(localStorage.getItem("user_id"));
      const updatedGaleria = await getGaleria(userId);
      setGaleria(updatedGaleria as any);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchGaleria();
    fetchUser();
  }, []);

  return (
    <>
      {user && (
        <Container>
          <SideBar />
          <MainContent>
            <Title>
              <Image src={Logo} alt="Logo" width={49} height={53} />
              Reciclique
            </Title>
            <Divisor />
            <Header>
              <div className="profile-pic">
                <Image src={user.photo} alt="Profile" width={80} height={80} />
              </div>
            </Header>
            <div style={{ height: "3rem" }} /> {/* espaço abaixo da foto */}
            {galeria && galeria.length ? (
              <>
                <UserInfo>
                  <div className="left">
                    <p className="username">{user.username}</p>
                    <p className="email">{user.email}</p>
                  </div>
                  <div className="right">
                    <p className="other">
                      <FaWhatsapp
                        style={{ marginRight: "6px", color: "#25D366" }}
                      />
                      {user.phone}
                    </p>
                    <p className="other">
                      <FaInstagram
                        style={{ marginRight: "6px", color: "#C13584" }}
                      />
                      @{user.instagram}
                    </p>
                  </div>
                  {user.greeting && <p className="greeting">{user.greeting}</p>}
                </UserInfo>
                <Divisor />

                <CardsWrapper>
                  {galeria.map((post: any) => (
                    <GalleryCard
                      userPhoto={user.photo}
                      userName={user.name}
                      dateTime={post.created_at}
                      projectTitle={post.title}
                      projectDescription={post.description}
                      materials={post.post_materiais
                        .map(
                          (post_material: any) => post_material.material.name
                        )
                        .join(", ")}
                      tutorialLink={post.link}
                      projectPhoto={[post.photo, post.photo_2, post.photo_3]}
                      liked={post.post_likes?.find(
                        (like: any) => like.user_id === user.id
                      )}
                      disliked={false}
                      likes={10}
                      dislikes={2}
                      comments={post.comments}
                      post={post}
                      currentIndex={0}
                      onNavigate={() => {}}
                      deletePost={() => handleDeletePost(post.id)}
                      onLikeUpdate={handleLikeUpdate}
                      onCommentUpdate={handleCommentUpdate}
                    />
                  ))}
                </CardsWrapper>
              </>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "2rem",
                  fontSize: "1.2rem",
                  color: "#555",
                }}
              >
                Sua galeria está vazia
              </div>
            )}
          </MainContent>
        </Container>
      )}
    </>
  );
}
