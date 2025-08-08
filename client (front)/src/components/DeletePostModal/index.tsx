import React, { useState } from "react";
import {
  ModalOverlay,
  ModalBox,
  Title,
  Text,
  ButtonRow,
  CancelButton,
  DeleteButton,
} from "./style";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const DeletePostModal: React.FC<Props> = ({ isOpen, onCancel, onDelete }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onCancel}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Title>Deseja excluir a postagem?</Title>
        <Text>
          Excluir a postagem é uma ação permanente e irreversível, resultando na
          perda de todos os dados preenchidos.
        </Text>
        <ButtonRow>
          <CancelButton onClick={onCancel} disabled={loading}>
            Cancelar
          </CancelButton>
          <DeleteButton onClick={onDelete} disabled={loading}>
            {loading ? "Excluindo..." : "Excluir"}
          </DeleteButton>
        </ButtonRow>
      </ModalBox>
    </ModalOverlay>
  );
};

export default DeletePostModal;
