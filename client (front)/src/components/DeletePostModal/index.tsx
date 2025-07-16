import React from 'react';
import { ModalOverlay, ModalBox, Title, Text, ButtonRow, CancelButton, DeleteButton } from './style';




interface Props {
  isOpen: boolean;
  onCancel: () => void;
  onDelete: () => void;
}



const DeletePostModal: React.FC<Props> = ({ isOpen, onCancel, onDelete }) => {
  if (!isOpen) return null;
  return (
    <ModalOverlay onClick={onCancel}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Title>Deseja excluir a postagem</Title>
        <Text>
          Excluir a postagem é uma ação permanente e irreversível, resultando na perda de todos os dados preenchidos.
        </Text>
        <ButtonRow>
          <CancelButton onClick={onCancel}>Cancelar</CancelButton>
          <DeleteButton onClick={onDelete}>Excluir</DeleteButton>
        </ButtonRow>
      </ModalBox>
    </ModalOverlay>
  );
};

export default DeletePostModal;
