import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Container,
  MainContent,
  Divisor,
  TopBar,
} from './style';

import { SideBar } from '../../components';
import Postagem from '../../components/Postagem';
import { Logo, ProfileIcon } from '../../assets';
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
      userPhoto: "/img/ProfileIcon.png",
      userName: 'Caio',
      dateTime: '17/07/2025 ás 15:00',
      text: 'Lindo Lo! Tu arrasa!',
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

        <TopBar>
            <div className="logo-wrapper">
              <Image src={Logo} alt="logo" width={49} height={53} />
              <span className="logo-text">ReciClique</span>
            </div>
            
            <div className="search">
              <SearchModal />
            </div>

            <button className="postagem" onClick={() => setShowPostModal(true)}>
              + Nova Postagem
            </button>
        </TopBar>


        <NewPostModal
          isOpen={showPostModal}
          onClose={() => setShowPostModal(false)}
          onSubmit={handleNovaPostagem}
        />

        <Divisor />

        {/* Mock de postagem para exibição */}
        <Postagem
          userPhoto="/img/user1.jpg"
          userName="Lore"
          dateTime="17/07/2025 ás 14:00"
          projectTitle="Vaso de Garrafa PET"
          projectDescription="Um jardim feito com materiais recicláveis, ideal para varandas."
          materials="Garrafa PET, estilete, cola quente"
          tutorialLink="https://www.youtube.com/watch?v=xTqb6B03TI0"
          projectPhoto={['/img/projeto.jpg', '/img/projeto2.jpg']}
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
