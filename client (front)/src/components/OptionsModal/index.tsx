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
        } } onClose={function (): void {
          throw new Error('Function not implemented.');
        } } onEdit={function (): void {
          throw new Error('Function not implemented.');
        } }      />


      <EditPostModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)} onSubmit={function (titulo: string, descricao: string, materiais: string, tutorial?: string): void {
          throw new Error('Function not implemented.');
        } } onEdit={function (): void {
          throw new Error('Function not implemented.');
        } }      />
    </>
  );
};

export default OptionsModal;
