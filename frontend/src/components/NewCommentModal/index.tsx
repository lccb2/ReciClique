import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  Overlay,
  ModalContainer,
  ModalHeader,
  InputWrapper,
  TextArea,
  Label,
  RequiredMark,
  ButtonsContainer,
  Button,
} from "./style";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (comentario: string) => Promise<void>;
}

const CommentModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [comentario, setComentario] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!comentario.trim()) {
      toast.error("O comentário não pode estar vazio.");
      return;
    }

    if (comentario.trim().length < 3) {
      toast.error("O comentário deve ter pelo menos 3 caracteres.");
      return;
    }

    setLoading(true);
    try {
      await onSubmit(comentario);
      toast.success("Comentário adicionado com sucesso!");
      setComentario("");
      onClose();
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
      toast.error("Erro ao adicionar comentário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={handleClose}>
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
            disabled={loading}
          />
        </InputWrapper>

        <ButtonsContainer>
          <Button cancel onClick={handleClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading || !comentario.trim()}
          >
            {loading ? "Adicionando..." : "Adicionar"}
          </Button>
        </ButtonsContainer>
      </ModalContainer>
    </Overlay>
  );
};

export default CommentModal;
