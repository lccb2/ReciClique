import React, { useState } from 'react';
import EditPostModal from '../EditPostModal';
import DeletePostModal from '../DeletePostModal';     
import {
  ModalContainer,
  Option,
  OptionList,
} from './style';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

export default function OptionsModal({ isOpen, onClose }: Props) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!isOpen) return null;

  return (
    <>

        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <OptionList>
            <Option
              onClick={(e) => {
                e.stopPropagation();
                setShowEditModal(true);
                onClose(); // fecha o menu de opções
              }}
            >
              Editar post
            </Option>
            <Option
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteModal(true);
                onClose(); 
              }}
            >
              Excluir post
            </Option>
          </OptionList>
        </ModalContainer>

      {showEditModal && (
        <EditPostModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeletePostModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onCancel={() => setShowDeleteModal(false)}
          onDelete={() => {
            setShowDeleteModal(false);
            // Add your delete logic here if needed
          }}
        />
      )}
    </>
  );
}
