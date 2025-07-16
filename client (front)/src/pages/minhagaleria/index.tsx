import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Container, MainContent, Header, Title, Divisor, UserInfo, CardsWrapper } from './style';
import { SideBar } from '../../components';
import { CoverBg, ProfileIcon, Logo } from '../../assets';
import GalleryCard from '../../components/Postagem';

export default function MinhaGaleria() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('profileData');
    if (savedData) {
      setProfileData(JSON.parse(savedData));
    }
  }, []);

  return (
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
          <div className="profile-pic">
            <Image src={ProfileIcon} alt="Profile" width={80} height={80} />
          </div>
        </Header>

        {/* Dados do usuário salvos no perfil */}
        {profileData && (
          <>
            <UserInfo>
              <div className="left">
                <p className="username">{profileData.username}</p>
                <p className="email">{profileData.email}</p>
              </div>
              <div className="right">
                <p className="other">{profileData.phone}</p>
                <p className="other">{profileData.instagram}</p>
              </div>
              {profileData.greeting && (
                <p className="greeting">{profileData.greeting}</p>
              )}
            </UserInfo>
            <Divisor />
          </>
        )}

        {/* Cards de postagem */}
        <CardsWrapper>
          <GalleryCard
              userPhoto={ProfileIcon}
              userName="Caio"
              dateTime="15/07/2025 às 18:00"
              projectTitle="Porta-trecos reciclado"
              projectDescription="Transformei um pote de sorvete em um porta-trecos super fofo!"
              materials="Pote de sorvete, tecido, cola quente, tesoura"
              tutorialLink="https://youtu.be/RecicliqueDIY02"
              projectPhoto={ProfileIcon}
              liked={true}
              disliked={false}
              comments={[
                {
                  id: 1,
                  userPhoto: "/img/avatar-maria.png",
                  userName: "Maria Eduarda",
                  dateTime: "20/07/2025 às 20:47",
                  text: "Socorrooo que tudo 😍 ficou lindo demais, Caio! Já quero fazer um igual!",
                  liked: false,
                  disliked: true,
                },
              ]}
            />

          <GalleryCard />
          <GalleryCard />
        </CardsWrapper>
      </MainContent>
    </Container>
  );
}
