import React, { useState, useRef } from 'react';
import {
  Overlay,
  ModalContainer,
  InputWrapper,
  Input,
  TextArea,
  Label,
  ButtonsContainer,
  Button,
  PreviewContainer,
  PreviewImage,
  ImageDropzone,
  DropText,
  ModalHeader,
  RequiredMark,
  RemoveButton
} from './style';
import MaterialSelector from '../MaterialSelector'; 
import ConfirmPost from '../ConfirmPostModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    titulo: string,
    descricao: string,
    materiais: string,
    tutorial?: string
  ) => void;
}

const EditPostModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [materiaisSelecionados, setMateriaisSelecionados] = useState<string[]>([]);
  const [tutorial, setTutorial] = useState('');
  const [imagens, setImagens] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showConfirmPost, setShowConfirmPost] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedFiles = Array.from(files).slice(0, 3 - imagens.length);
    setImagens((prev) => [...prev, ...selectedFiles]);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith('image/')
    );

    const allowed = 3 - imagens.length;
    const selected = files.slice(0, allowed);
    setImagens((prev) => [...prev, ...selected]);
  };

  const removeImage = (index: number) => {
    setImagens(imagens.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!titulo.trim() || !descricao.trim() || materiaisSelecionados.length === 0) {
      alert('Preencha os campos obrigatórios (*)');
      return;
    }

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descricao', descricao);
    formData.append('materiais', materiaisSelecionados.join(', '));
    formData.append('tutorial', tutorial);

    imagens.forEach((img, index) => {
      formData.append(`imagem${index + 1}`, img);
    });

    fetch('http://localhost:3000/posts', {
      method: 'POST',
      body: formData,
      }).then((res) => {
      if (res.ok) {
      setTitulo('');
      setDescricao('');
      setMateriaisSelecionados([]);
      setTutorial('');
      setImagens([]);
      setShowConfirmPost(true); 
      setTimeout(() => {
      setShowConfirmPost(false);
      onClose();
      }, 3000);
      } else {
      alert('Erro ao criar postagem.');
      }
      });
        };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
      {showConfirmPost ? (
      <ConfirmPost onClose={() => setShowConfirmPost(false)} />
      ) : (
      <>
      <ModalHeader>
      <img src="/img/plus.png" alt="+" width={20} height={20} />
      <h2>Editar Postagem</h2>
      </ModalHeader>
        {imagens.length < 3 && (
          <ImageDropzone
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            htmlFor="image-upload"
          >
            <DropText>Arraste ou clique para adicionar imagens (máx. 3)</DropText>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              style={{ display: 'none' }}
              ref={inputRef}
            />
          </ImageDropzone>
        )}

        {imagens.length > 0 && (
          <PreviewContainer>
            {imagens.map((img, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <PreviewImage src={URL.createObjectURL(img)} alt={`preview-${i}`} />
                <RemoveButton onClick={() => removeImage(i)}>×</RemoveButton>
              </div>
            ))}
          </PreviewContainer>
        )}

        <InputWrapper>
          <Input
            id="titulo"
            placeholder=" "
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <Label htmlFor="titulo">
            Título <RequiredMark>*</RequiredMark>
          </Label>
        </InputWrapper>

        <InputWrapper>
          <TextArea
            id="descricao"
            placeholder=" "
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <Label htmlFor="descricao">
            Descrição <RequiredMark>*</RequiredMark>
          </Label>
        </InputWrapper>

        <InputWrapper>
          <MaterialSelector
            selected={materiaisSelecionados}
            setSelected={setMateriaisSelecionados}
          />
        </InputWrapper>

        <InputWrapper>
          <TextArea
            id="tutorial"
            placeholder=" "
            value={tutorial}
            onChange={(e) => setTutorial(e.target.value)}
            rows={1}
          />
          <Label htmlFor="tutorial">Tutorial (opcional)</Label>
        </InputWrapper>

        <ButtonsContainer>
          <Button cancel onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Adicionar</Button>
        </ButtonsContainer>
      </>
      )}
      </ModalContainer>
    </Overlay>
  );
};

export default EditPostModal;
