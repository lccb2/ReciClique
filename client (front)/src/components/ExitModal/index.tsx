import React from 'react';
import { ModalOverlay, ModalBox, Title, Text, ButtonRow, CancelButton, DeleteButton } from './style';
import ModalBase from '../OptionsModal';

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

const DeletePostModal: React.FC<Props> = ({ isOpen, onCancel, onDelete }) => {
  return (
        <ModalOverlay onClick={onCancel}>
        <ModalBox onClick={(e) => e.stopPropagation()}>
            <Title>Tem certeza de que deseja sair do sistema?</Title>
            <Text>
            Você pode fazer login novamente a qualquer momento.
            </Text>
            <ButtonRow>
            <CancelButton onClick={onCancel}>Cancelar</CancelButton>
            <DeleteButton onClick={onDelete}>Sair</DeleteButton>
            </ButtonRow>
        </ModalBox>
        </ModalOverlay>
  );
};

export default DeletePostModal;
