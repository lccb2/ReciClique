import { useRouter } from "next/router";
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
import GalleryCard from "../../components/Postagem";
import { Logo, CoverBg, ProfileIcon } from "../../assets";
import { getUserPosts } from "api/post";
import { getUser } from "api/user";

export default function PerfilUsuario() {
  const router = useRouter();
  const { userId } = router.query;

  const [profileData, setProfileData] = useState<any>(null);
  const [postagens, setPostagens] = useState<any[]>([]);

  useEffect(() => {
    if (!userId) return;

    const fetchUserPosts = async () => {
      const posts = await getUserPosts(Number(userId));

      setPostagens(posts);
    };

    const fetchUserProfile = async () => {
      const profile = await getUser(Number(userId));

      console.log(profile, "profile");

      setProfileData(profile as any);
    };

    fetchUserPosts();
    fetchUserProfile();
  }, [userId]);

  return (
    <>
      {profileData ? (
        <Container>
          <SideBar />
          <MainContent>
            <Title>
              <Image src={Logo} alt="Logo" width={49} height={53} />
              Reciclique
            </Title>
            <Divisor />
            <Header>
              <Image src={CoverBg} alt="Cover" fill />
              {profileData?.photo ? (
                <div className="profile-pic">
                  <Image src={profileData?.photo} alt="Profile" width={80} height={80} loading="lazy" onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = ProfileIcon.src;
                  }} />
                </div>
              ) : (
                <div className="profile-pic">
                  <Image src={ProfileIcon} alt="Profile" width={80} height={80} />
                </div>
              )}
            </Header>

            {profileData && (
              <>
                <UserInfo>
                  <div className="left">
                    <p className="username">{profileData.name}</p>
                    {profileData.show_email && profileData.email && (
                      <p className="email">E-mail: {profileData.email}</p>
                    )}
                  </div>
                  <div className="right">
                    {profileData.show_phone && profileData.phone && (
                      <p className="other">Telefone: {profileData.phone}</p>
                    )}
                    {profileData.show_insta && profileData.instagram && (
                      <p className="other">Instagram: @{profileData.instagram}</p>
                    )}
                  </div>
                  {profileData.greeting && (
                    <div style={{ display: "flex", flexDirection: "column", marginTop: "10px", width: "100%" }}>
                      <p style={{ fontWeight: "bold", marginBottom: "5px", color: "#333" }}>Sobre mim:</p>
                      <p style={{ fontSize: "14px", color: "#666" }}>{profileData.greeting}</p>
                    </div>
                  )}
                </UserInfo>
                <Divisor />
              </>
            )}

            <CardsWrapper>
              {postagens.map((post, i) => (
                <GalleryCard
                  key={i}
                  post={post}
                  userPhoto={profileData?.photo}
                  userName={profileData?.name}
                  dateTime={post.created_at}
                  projectTitle={post.title}
                  projectDescription={post.description}
                  materials={post.post_materiais
                    .map((material: any) => material.material.name)
                    .join(", ")}
                  tutorialLink={post.link}
                  projectPhoto={[post.photo, post.photo_2, post.photo_3]}
                  liked={post.post_likes.some(
                    (like: any) => like.user_id === Number(userId)
                  )}
                  disliked={false}
                  likes={post.post_likes.length}
                  dislikes={0}
                  comments={post.comments}
                  onEdit={() => {}}
                  onDelete={() => {}}
                  deletePost={() => {}}
                  onLikeUpdate={() => {}}
                  onCommentUpdate={() => {}}
                  currentIndex={i}
                  onNavigate={() => {}}
                />
              ))}
            </CardsWrapper>
          </MainContent>
        </Container>
      ) : (
        <div>
          <h1>Carregando...</h1>
        </div>
      )}
    </>
  );
}
