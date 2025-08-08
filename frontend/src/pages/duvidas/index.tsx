import Image from 'next/image';
import { Container, MainContent, Title, Divisor, FaqBox, FaqItem, Question, Answer, TopBar } from './style';
import { SideBar } from '../../components';
import { Logo } from '../../assets';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaPaperPlane } from 'react-icons/fa';


export default function Duvidas() {
  const [faqList, setFaqList] = useState([
    {
      question: 'Como eu crio uma nova postagem com fotos do meu projeto?',
      answer: 'Pra criar uma postagem nova com fotos é bem fácil! Na página principal, clique no botão “+ Nova Postagem”. Aí é só preencher os detalhes do seu projeto, adicionar as fotos que quiser e mandar ver! Não esquece de caprichar nas imagens pra mostrar seu trabalho com orgulho 😄📸',
      expanded: false
    },
    {
      question: 'Onde eu adiciono o link do meu tutorial (YouTube, blog, etc)?',
      answer: 'Na hora de criar a postagem, vai ter um campo especial pra você colocar o link do seu tutorial — seja YouTube, blog ou onde você publicou. Assim quem curtir seu projeto pode aprender passo a passo direto com você!',
      expanded: false
    },
    {
      question: 'Como marco os materiais usados na minha postagem?',
      answer: 'Durante o cadastro da sua postagem, vai aparecer um modal com um formulário, e uma das etapas é justamente sobre os materiais utilizados. Nessa parte, você vai ver um campo de seleção múltipla (multiselect), é só clicar e escolher todos os materiais que usou no seu projeto (como garrafa PET, barbante, cola quente, etc). Você pode digitar para buscar mais rápido também! Assim, sua postagem fica mais organizada e outras pessoas conseguem ver rapidinho o que foi necessário pra fazer seu lacre sustentável 💚♻️',
      expanded: false
    },
    {
        question: 'Como eu vejo o perfil completo de outro usuário?',
        answer: 'Pra ver o perfil completo de alguém, é só clicar no nome ou foto desse usuário em qualquer postagem ou comentário. Você será levado direto pra página do perfil, onde pode ver as postagens, seguidores e outras infos que ele compartilha 😉',
        expanded: false
    },
    {
      question: 'Tem como salvar um post pra ver depois?',
      answer: 'Ainda não temos esse recurso, mas está em nossos planos!',
      expanded: false
    },
    {
      question: 'Consigo seguir pessoas aqui na plataforma?',
      answer: 'Ainda não. Acompanhar usuários será possível em uma futura atualização.',
      expanded: false
    }
  ]);

  const toggleItem = (index: number) => {
    const newFaqList = [...faqList];
    newFaqList[index].expanded = !newFaqList[index].expanded;
    setFaqList(newFaqList);
  };

  const handleFormRedirect = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLScq3VTBg3zMu6sffMFIoxp3mk4klvH7BMxwsU19Az6xs4ySJA/viewform', '_blank');
  };


  return (
    <Container>
      <SideBar />
      <MainContent>
        <TopBar>
          <Title>
            <Image src={Logo} alt="Logo" width={49} height={53} />
            Reciclique
          </Title>
          <button onClick={handleFormRedirect}>
            <FaPaperPlane style={{ marginRight: '0.5rem' }} />
            Enviar Dúvida
          </button>
        </TopBar>
        <Divisor />
        <FaqBox>
            <h2>Dúvidas frequentes</h2>
            {faqList.map((item, index) => (
                <FaqItem key={index}>
                <Question onClick={() => toggleItem(index)}>
                    {item.question}
                    <span>
                        {item.expanded ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                </Question>
                {item.expanded && <Answer>{item.answer}</Answer>}
                </FaqItem>
            ))}
        </FaqBox>
      </MainContent>
    </Container>
  );
}
