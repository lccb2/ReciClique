import { useState } from 'react';
import Image from 'next/image';
import { Container, MainContent, Header, Form, Row, Title, Divisor, Description } from './style';
import { SideBar } from '../../components';
import { CoverBg, ProfileIcon, Logo } from '../../assets';

export default function Profile() {
  // estados para controlar os campos do form
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [greeting, setGreeting] = useState('');

  // salvar os dados no localStorage
  const handleSave = (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // evitar reload da página
    const profileData = { username, email, phone, instagram, greeting };
    localStorage.setItem('profileData', JSON.stringify(profileData));
    alert('Dados salvos!');
  };

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
        <Form onSubmit={handleSave}>
          <Row>
            <label>
              <span><span style={{ color: 'red' }}>*</span> Nome de Usuário</span>
              <input
                placeholder="Digite o nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label>
              <span><span style={{ color: 'red' }}>*</span> E-mail </span>
              <input
                type="email"
                placeholder="Digite o seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div>
                <input type="checkbox" id="showEmail" />
                <span>Desejo mostrar no meu perfil</span>
              </div>
            </label>
            <label>
              <span><span style={{ color: 'red' }}>*</span> Telefone </span>
              <input
                placeholder="Digite o seu telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <div>
                <input type="checkbox" id="showPhone" />
                <span>Desejo mostrar no meu perfil</span>
              </div>
            </label>
            <label>
              Instagram
              <input
                placeholder="Digite o seu @ do instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
              <div>
                <input type="checkbox" id="showInstagram" />
                <span>Desejo mostrar no meu perfil</span>
              </div>
            </label>
          </Row>
          <Description>
            Mensagem de saudação
          </Description>
          <textarea
            placeholder="Insira uma breve saudação"
            value={greeting}
            onChange={(e) => setGreeting(e.target.value)}
          />
          <div className="actions">
            <button type="button" className="delete">✖ Apagar Conta</button>
            <button type="submit" className="save">✅ Salvar alterações</button>
          </div>
        </Form>
      </MainContent>
    </Container>
  );
}
