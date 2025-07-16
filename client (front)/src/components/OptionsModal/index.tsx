import React, { useState } from 'react';
import { Container, Option } from './style';
import DeletePostModal from '../DeletePostModal';
import EditPostModal from '../EditPostModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const OptionsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  if (!isOpen && !showDeleteModal && !showEditModal) return null;

  return (
    <>
      {isOpen && (
        <Container onClick={onClose}>
          <Option
            onClick={(e) => {
              e.stopPropagation();
              setShowEditModal(true);
              onClose();
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
        </Container>
      )}

      <DeletePostModal
        isOpen={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onDelete={() => {
          alert('Post deletado!');
          setShowDeleteModal(false);
        }}
      />

      <EditPostModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
      />
    </>
  );
};

export default OptionsModal;
