import React, { useState } from 'react';
import {
  Overlay,
  ModalContainer,
  ModalHeader,
  InputWrapper,
  TextArea,
  Label,
  RequiredMark,
  ButtonsContainer,
  Button
} from './style';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (comentario: string) => void;
}

const CommentModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [comentario, setComentario] = useState('');

  const handleSubmit = () => {
    if (!comentario.trim()) {
      alert('O comentário não pode estar vazio.');
      return;
    }

    onSubmit(comentario);
    setComentario('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <img src="/img/plus.png" alt="+" width={20} height={20} />
          <h2>Novo Comentário</h2>
        </ModalHeader>

        <InputWrapper>
          <Label htmlFor="comentario">
            Conteúdo <RequiredMark>*</RequiredMark>
          </Label>
          <TextArea
            placeholder="Insira um breve comentário, seja educado(a) :)"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            rows={4}
          />
        </InputWrapper>

        <ButtonsContainer>
          <Button cancel onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Adicionar</Button>
        </ButtonsContainer>
      </ModalContainer>
    </Overlay>
  );
};

export default CommentModal;
