import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Container,
  MainContent,
  Title,
  Divisor,
  TopBarWrapper,
  TopBar,
} from './style';

import { SideBar } from '../../components';
import Postagem from '../../components/Postagem';
import { Logo } from '../../assets';
import SearchModal from '../../components/SearchModal';
import NewPostModal from '../../components/NewPostModal';
import { Comment } from '../../types/comment';

export default function TelaInicial() {
  const [postagens, setPostagens] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);

  useEffect(() => {
    const fetchPostagens = async () => {
      const res = await fetch('/api/postagens');
      const data = await res.json();
      setPostagens(data);
    };

    fetchPostagens();
  }, []);

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
      usuario: 'Você',
      data: new Date().toISOString(),
    };

    setPostagens((prev) => [novaPostagem, ...prev]);
  };
  {/* Mock de comentários para a postagem */}
  const comentariosMock: Comment[] = [
    {
      id: 1,
      userPhoto: '/user1.png',
      userName: 'Ana Paula',
      dateTime: '2025-07-17 15:00',
      text: 'Muito bom esse projeto!',
      likes: 3,
      dislikes: 0,
      liked: false,
      disliked: false,
    },
  ];

  return (
    <Container>
      <SideBar />

      <MainContent>
        <Title>
          <Image src={Logo} alt="Logo" width={39} height={43} />
          Reciclique
        </Title>

        <TopBarWrapper>
          <TopBar>
            <SearchModal />
          </TopBar>
          <button className="nova-postagem" onClick={() => setShowPostModal(true)}>
            + 
          </button>
        </TopBarWrapper>

        <NewPostModal
          isOpen={showPostModal}
          onClose={() => setShowPostModal(false)}
          onSubmit={handleNovaPostagem}
        />

        <Divisor />

        {/* Mock de postagem para exibição */}
        <Postagem
          userPhoto="/img/user1.jpg"
          userName="João Recicla"
          dateTime="2025-07-17 14:00"
          projectTitle="Luminária de Garrafa PET"
          projectDescription="Uma luminária feita com materiais recicláveis, ideal para quartos."
          materials="Garrafa PET, lâmpada LED, estilete, cola quente"
          tutorialLink="https://youtube.com/tutorial-luminaria"
          projectPhoto={['/img/projeto.jpg', '/img/user1.jpg']}
          liked={false}
          disliked={false}
          likes={15}
          dislikes={1}
          comments={comentariosMock}
          currentIndex={0}
          onNavigate={() => {}}
          onEdit={() => alert('Editar postagem')}
          onDelete={() => alert('Postagem deletada')}
        />
      </MainContent>
    </Container>
  );
}
