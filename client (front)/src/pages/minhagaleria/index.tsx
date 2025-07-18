import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Container,
  MainContent,
  Header,
  Title,
  Divisor,
  UserInfo,
  CardsWrapper
} from './style';
import { SideBar } from '../../components';
import { ProfileIcon, Logo } from '../../assets';
import GalleryCard from '../../components/Postagem';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

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
          <div className="profile-pic">
            <Image src={ProfileIcon} alt="Profile" width={80} height={80} />
          </div>
        </Header>

        <div style={{ height: '3rem' }} /> {/* espaço abaixo da foto */}

        {profileData && (
          <>
            <UserInfo>
              <div className="left">
                <p className="username">{profileData.username}</p>
                <p className="email">{profileData.email}</p>
              </div>
              <div className="right">
                <p className="other">
                  <FaWhatsapp style={{ marginRight: '6px', color: '#25D366' }} />
                  {profileData.phone}
                </p>
                <p className="other">
                  <FaInstagram style={{ marginRight: '6px', color: '#C13584' }} />
                  @{profileData.instagram}
                </p>
              </div>
              {profileData.greeting && (
                <p className="greeting">{profileData.greeting}</p>
              )}
            </UserInfo>
            <Divisor />
          </>
        )}

        <CardsWrapper>
          <GalleryCard
            userPhoto={ProfileIcon}
            userName="Caio"
            dateTime="15/07/2025 às 18:00"
            projectTitle="Porta-trecos reciclado"
            projectDescription="Transformei um pote de sorvete em um porta-trecos super fofo!"
            materials="Pote de sorvete, tecido, cola quente, tesoura"
            tutorialLink="https://www.youtube.com/watch?v=w-ienczdqrw"
            projectPhoto={['/img/projeto4.jpg', '/img/projeto3.jpg']}
            liked={true}
            disliked={false}
            likes={10}
            dislikes={2}
            comments={[
              {
                id: 1,
                userPhoto: "/img/user1.jpg",
                userName: "Lore",
                dateTime: "20/07/2025 às 20:47",
                text: "Socorrooo que tudo 😍 ficou lindo demais, Caio! Já quero fazer um igual!",
                liked: false,
                disliked: false,
                likes: 5,
                dislikes: 0,
              },
            ]}
          />

          <GalleryCard 
          userPhoto={ProfileIcon}
            userName="Caio"
            dateTime="15/07/2025 às 18:00"
            projectTitle="Porta-trecos reciclado"
            projectDescription="Transformei um pote de sorvete em um porta-trecos super fofo!"
            materials="Pote de sorvete, tecido, cola quente, tesoura"
            tutorialLink="https://www.youtube.com/watch?v=w-ienczdqrw"
            projectPhoto={['/img/projeto4.jpg', '/img/projeto3.jpg']}
            liked={true}
            disliked={false}
            likes={10}
            dislikes={2}
            comments={[
              {
                id: 1,
                userPhoto: "/img/user1.jpg",
                userName: "Lore",
                dateTime: "20/07/2025 às 20:47",
                text: "Socorrooo que tudo 😍 ficou lindo demais, Caio! Já quero fazer um igual!",
                liked: false,
                disliked: false,
                likes: 5,
                dislikes: 0,}
            ]}/>

          <GalleryCard 
            userPhoto={ProfileIcon}
            userName="Caio"
            dateTime="15/07/2025 às 18:00"
            projectTitle="Porta-trecos reciclado"
            projectDescription="Transformei um pote de sorvete em um porta-trecos super fofo!"
            materials="Pote de sorvete, tecido, cola quente, tesoura"
            tutorialLink="https://www.youtube.com/watch?v=w-ienczdqrw"
            projectPhoto={['/img/projeto4.jpg', '/img/projeto3.jpg']}
            liked={true}
            disliked={false}
            likes={10}
            dislikes={2}
            comments={[
              {
                id: 1,
                userPhoto: "/img/user1.jpg",
                userName: "Lore",
                dateTime: "20/07/2025 às 20:47",
                text: "Socorrooo que tudo 😍 ficou lindo demais, Caio! Já quero fazer um igual!",
                liked: false,
                disliked: false,
                likes: 5,
                dislikes: 0,}
            ]}/>
        </CardsWrapper>
      </MainContent>
    </Container>
  );
}
