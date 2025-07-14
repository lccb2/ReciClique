import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Container, MainContent, Header, Form, Row, Title, Divisor, Description } from './style';
import { SideBar } from '../../components';
import { CoverBg, ProfileIcon, Logo } from '../../assets';

export default function Profile() {

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
          <Image src={CoverBg} alt="Cover" fill/>
          <div className="profile-pic">
            <Image src={ProfileIcon} alt="Profile" width={80} height={80} />
          </div>
        </Header>
        <Form>
          <Row>
            <label>
            <span><span style={{color:'red'}}>*</span> Nome de Usuário</span>
              <input placeholder="Digite o nome de usuário" />
            </label>
            <label>
            <span><span style={{color:'red'}}>*</span> E-mail </span>
              <input placeholder="Digite o seu e-mail" />
              <div>
              <input type="checkbox" id="showProfile1" />
              <span>Desejo mostrar no meu perfil</span>
            </div>          
            </label>
            <label>
            <span><span style={{color:'red'}}>*</span>  Telefone </span>
              <input placeholder="Digite o seu telefone" />
              <div>
              <input type="checkbox" id="showProfile1" />
              <span>Desejo mostrar no meu perfil</span>
            </div>            </label>
            <label>
              Instagram
              <input placeholder="Digite o seu @ do instagram" />
              <div>
              <input type="checkbox" id="showProfile1" />
              <span>Desejo mostrar no meu perfil</span>
            </div>
            </label>
          </Row>
          <Description>
          Mensagem de saudação
          </Description>
          <textarea placeholder="Insira uma breve saudação"></textarea>
          <div className="actions">
            <button className="delete"> ✖ Apagar Conta</button>
            <button className="save">✅ Salvar alterações</button>
          </div>
        </Form>
      </MainContent>
    </Container>
  );
}
