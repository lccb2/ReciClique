import React from 'react';
import { Container, Icon, TextWrapper, Title, Message } from './style';

interface ConfirmPostProps {
  onClose: () => void;
}

const ConfirmPost: React.FC<ConfirmPostProps> = ({ onClose }) => {
  return (
    <Container>
      <Icon src="img/check.png" alt="check" />
      <TextWrapper>
        <Title>Postagem realizada</Title>
        <Message>Parabéns, sua postagem foi adicionada à plataforma!</Message>
      </TextWrapper>
    </Container>
  );
};

export default ConfirmPost;
