import React from 'react';
import {
  ModalContainer,
  Option,
  OptionList,
} from './style';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export default function OptionsModal({ isOpen, onClose, onEdit, onDelete }: Props) {
  if (!isOpen) return null;

  return (
    <ModalContainer onClick={(e) => e.stopPropagation()}>
      <OptionList>
        <Option
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
            onClose();
          }}
        >
          Editar post
        </Option>
        <Option
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
            onClose();
          }}
        >
          Excluir post
        </Option>
      </OptionList>
    </ModalContainer>
  );
}
