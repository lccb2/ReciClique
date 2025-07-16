import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Container, MainContent, Header, Title, Divisor, UserInfo, CardsWrapper
} from './style';
import { SideBar } from '../../components';
import GalleryCard from '../../components/Postagem';
import { Logo, CoverBg, ProfileIcon } from '../../assets';

export default function PerfilUsuario() {
  const router = useRouter();
  const { username } = router.query;

  const [profileData, setProfileData] = useState(null);
  const [postagens, setPostagens] = useState([]);

  useEffect(() => {

    if (!username) return;

    // Simulação de fetch de perfil e posts por nome de usuário
    const fetchDados = async () => {
      const perfil = await fetch(`/api/perfil/${username}`).then(res => res.json());
      const posts = await fetch(`/api/postagens?autor=${username}`).then(res => res.json());

      setProfileData(perfil);
      setPostagens(posts);
    };

    fetchDados();
  }, [username]);

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

        <CardsWrapper>
          {postagens.map((post, i) => (
            <GalleryCard key={i} {...post} />
          ))}
        </CardsWrapper>
      </MainContent>
    </Container>
  );
}
