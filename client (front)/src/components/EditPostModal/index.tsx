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
import { editPost, getPost } from "api/post";
import { getMateriais } from "api/pesq";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (
    titulo: string,
    descricao: string,
    materiais: string,
    tutorial?: string
  ) => void;
  post: any;
}

const EditPostModal: React.FC<Props> = ({ isOpen, onClose, post }) => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [materiaisSelecionados, setMateriaisSelecionados] = useState<number[]>(
    []
  );
  const [tutorial, setTutorial] = useState("");
  const [imagens, setImagens] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showConfirmPost, setShowConfirmPost] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [materiais, setMateriais] = useState([]);
  const [loading, setLoading] = useState(false);

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
    console.log(index, 'index')
    console.log(imagens, 'imagensAntes')

    if (index === 0) {
      setImagens([...imagens.slice(1)]);
    } else if (index === 1) {
      setImagens([...imagens.slice(0, 1), ...imagens.slice(2)]);
    } else {
      setImagens([...imagens.slice(0, 2), ...imagens.slice(3)]);
    }
  };

  const handleSubmit = async () => {
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
      await editPost(post.id, {
        title: titulo,
        description: descricao,
        materiais: materiaisSelecionados,
        link: tutorial,
        photos: imagens,
      });

      toast.success("Postagem editada com sucesso!");

      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 2000);

      setShowConfirmPost(false);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao editar postagem. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMateriais = async () => {
    try {
      const response = await getMateriais();
      setMateriais(response);
    } catch (error) {
      console.log(error, "error");
      toast.error("Erro ao carregar materiais");
    }
  };

  const fetchPost = async () => {
    try {
      const response = await getPost(post.id);

      setTitulo(response.title);
      setDescricao(response.description);
      setMateriaisSelecionados(
        response.post_materiais.map(
          (post_material: any) => post_material.material.id
        )
      );
      setImagens(
        [response.photo, response.photo_2, response.photo_3].filter(Boolean)
      );
      setTutorial(response.link || "");

      setCurrentPost(response);
    } catch (error) {
      console.log(error, "error");
      toast.error("Erro ao carregar dados da postagem");
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
                      disabled={loading}
                    />
                  </ImageDropzone>
                )}

                {imagens.length > 0 && (
                  <PreviewContainer>
                    {imagens.map((img, i) => {
                      const src =
                        typeof img === "string"
                          ? img
                          : URL.createObjectURL(img);

                      return (
                        <div key={i} style={{ position: "relative" }}>
                          <PreviewImage src={src} alt={`preview-${i}`} />
                          <RemoveButton
                            onClick={() => removeImage(i)}
                            disabled={loading}
                          >
                            ×
                          </RemoveButton>
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
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
                  />
                  <Label htmlFor="tutorial">Tutorial (opcional)</Label>
                </InputWrapper>

                <ButtonsContainer>
                  <Button cancel onClick={onClose} disabled={loading}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Editando..." : "Editar"}
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

export default EditPostModal;
