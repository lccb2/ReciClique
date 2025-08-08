import React from "react";
import {
  ModalOverlay,
  ModalBox,
  Title,
  Text,
  ButtonRow,
  CancelButton,
  DeleteButton,
} from "./style";

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  onConfirmDelete: () => void;
  loading?: boolean;
}

const DeleteAccountModal: React.FC<Props> = ({
  isOpen,
  onCancel,
  onConfirmDelete,
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onCancel}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Title>Tem certeza que deseja apagar sua conta?</Title>
        <Text>
          Essa ação é <strong>irreversível</strong> e todos os seus dados serão
          perdidos.
        </Text>
        <ButtonRow>
          <CancelButton onClick={onCancel} disabled={loading}>
            Cancelar
          </CancelButton>
          <DeleteButton onClick={onConfirmDelete} disabled={loading}>
            {loading ? "Apagando..." : "Apagar Conta"}
          </DeleteButton>
        </ButtonRow>
      </ModalBox>
    </ModalOverlay>
  );
};

export default DeleteAccountModal;
