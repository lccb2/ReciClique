import React, { useState, useRef, useEffect } from "react";
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
  RemoveButton,
} from "./style";
import MaterialSelector from "../MaterialSelector";
import ConfirmPost from "../ConfirmPostModal";
import { createPost } from "api/post";
import { getMateriais } from "api/pesq";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated?: () => void;
}

const NewPostModal: React.FC<Props> = ({ isOpen, onClose, onPostCreated }) => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [materiaisSelecionados, setMateriaisSelecionados] = useState<number[]>(
    []
  );
  const [tutorial, setTutorial] = useState("");
  const [imagens, setImagens] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showConfirmPost, setShowConfirmPost] = useState(false);
  const [materiais, setMateriais] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedFiles = Array.from(files).slice(0, 3 - imagens.length);
    setImagens((prev) => [...prev, ...selectedFiles]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    const allowed = 3 - imagens.length;
    const selected = files.slice(0, allowed);
    setImagens((prev) => [...prev, ...selected]);
  };

  const removeImage = (index: number) => {
    setImagens(imagens.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    // Validation
    if (!titulo.trim()) {
      toast.error("Título é obrigatório");
      return;
    }

    if (!descricao.trim()) {
      toast.error("Descrição é obrigatória");
      return;
    }

    if (materiaisSelecionados.length === 0) {
      toast.error("Selecione pelo menos um material");
      return;
    }

    setLoading(true);
    try {
      await createPost({
        title: titulo,
        description: descricao,
        materiais: materiaisSelecionados,
        link: tutorial,
        photos: imagens,
      });

      setShowConfirmPost(true);
      setTitulo("");
      setDescricao("");
      setMateriaisSelecionados([]);
      setTutorial("");
      setImagens([]);

      toast.success("Postagem criada com sucesso!");

      if (onPostCreated) {
        onPostCreated();
      }

      setTimeout(() => {
        setShowConfirmPost(false);
        onClose();
      }, 1000);
    } catch (error) {
      console.log(error, "error");
      toast.error("Erro ao criar postagem. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchMateriais = async () => {
      const response = await getMateriais();
      setMateriais(response);
    };
    fetchMateriais();
  }, [materiaisSelecionados]);

  if (!isOpen) return null;

  return (
    <>
      {materiais?.length > 0 && (
        <Overlay onClick={onClose}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            {showConfirmPost ? (
              <ConfirmPost onClose={() => setShowConfirmPost(false)} />
            ) : (
              <>
                <ModalHeader>
                  <img src="/img/plus.png" alt="+" width={20} height={20} />
                  <h2>Nova Postagem</h2>
                </ModalHeader>
                {imagens.length < 3 && (
                  <ImageDropzone
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    htmlFor="image-upload"
                  >
                    <DropText>
                      Arraste ou clique para adicionar imagens (máx. 3)
                    </DropText>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      ref={inputRef}
                    />
                  </ImageDropzone>
                )}

                {imagens.length > 0 && (
                  <PreviewContainer>
                    {imagens.map((img, i) => (
                      <div key={i} style={{ position: "relative" }}>
                        <PreviewImage
                          src={URL.createObjectURL(img)}
                          alt={`preview-${i}`}
                        />
                        <RemoveButton onClick={() => removeImage(i)}>
                          ×
                        </RemoveButton>
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
                  <Button cancel onClick={onClose} disabled={loading}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Criando..." : "Adicionar"}
                  </Button>
                </ButtonsContainer>
              </>
            )}
          </ModalContainer>
        </Overlay>
      )}
    </>
  );
};

export default NewPostModal;
