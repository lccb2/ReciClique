import React, { useState, useRef, useEffect } from 'react';
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
import { editPost, getPost } from 'api/post';
import { baseURL } from 'api/base';
import { getMateriais } from 'api/pesq';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (titulo: string, descricao: string, materiais: string, tutorial?: string) => void;
  post: any;
}

const EditPostModal: React.FC<Props> = ({ isOpen, onClose, post }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [materiaisSelecionados, setMateriaisSelecionados] = useState<[]>([]);
  const [tutorial, setTutorial] = useState('');
  const [imagens, setImagens] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showConfirmPost, setShowConfirmPost] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [materiais, setMateriais] = useState([]);

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

  const handleSubmit = async() => {
    if (!titulo.trim() || !descricao.trim() || materiaisSelecionados.length === 0) {
      alert('Preencha os campos obrigatórios (*)');
      return;
    }

    console.log(materiaisSelecionados, 'materiais')
    try {
      await editPost(post.id, {
        title: titulo,
        description: descricao,
        materiais: materiaisSelecionados,
        link: tutorial,
        photos: imagens
      });

      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 2000);

      setShowConfirmPost(false);

    } catch (error) {
      alert('Erro ao editar postagem.'); 
    }
  };

  const fetchMateriais = async() => {
    try {
      const response = await getMateriais();

      setMateriais(response);
    } catch (error) {
      console.log(error, 'error'); 
    }
  };

  const fetchPost = async() => {
    try {
      const response = await getPost(post.id);

      setTitulo(response.title);
      setDescricao(response.description);
      setMateriaisSelecionados(response.post_materiais.map((post_material : any) => post_material.material.id));
      setImagens([response.photo, response.photo_2, response.photo_3].filter(Boolean));
      setTutorial(response.link || '');

      setCurrentPost(response);
    } catch (error) {
      console.log(error, 'error')
    }
  };

  useEffect(() => {
    fetchPost();
    fetchMateriais();
  }, []);

  if (!isOpen) return null;

  return (
    <>
      {currentPost && materiais?.length && (
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
                {imagens.map((img, i) => {
                  const src =
                    typeof img === 'string'
                      ? `${baseURL}/uploads/${img}`
                      : URL.createObjectURL(img);

                  return (
                    <div key={i} style={{ position: 'relative' }}>
                      <PreviewImage src={src} alt={`preview-${i}`} />
                      <RemoveButton onClick={() => removeImage(i)}>×</RemoveButton>
                    </div>
                  );
                })}
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
                materiais={materiais}
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
      )}
    </>
  );
};

export default EditPostModal;
