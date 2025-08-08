import { useState } from "react";
import {
  Form,
  Input,
  Button,
  SecondaryButton,
  CheckboxContainer,
  Label,
  Field,
  ImageDropzone,
  DropText,
  PreviewContainer,
  PreviewImage,
  RemoveButton,
} from "./style";
import { useRouter } from "next/router";
import { register } from "../../api/aut";
import toast from "react-hot-toast";

export const Register = ({ onBack }: { onBack: () => void }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    instagram: "",
    show_email: true,
    show_phone: true,
    show_insta: true,
    photo: null as File | null,
    greeting: "",
  });

  const [step, setStep] = useState<"form" | "senha">("form");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    if (!form.name.trim()) {
      toast.error("Nome é obrigatório");
      return;
    }

    if (!form.email.trim()) {
      toast.error("E-mail é obrigatório");
      return;
    }

    if (!form.phone.trim()) {
      toast.error("Telefone é obrigatório");
      return;
    }

    if (!password.trim()) {
      toast.error("Senha é obrigatória");
      return;
    }

    if (!form.photo) {
      toast.error("Por favor, selecione uma foto de perfil");
      return;
    }

    setLoading(true);
    try {
      const response = await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password,
        phone: form.phone.trim(),
        photo: form.photo,
        show_email: form.show_email,
        show_phone: form.show_phone,
        show_insta: form.show_insta,
      });

      toast.success("Cadastro realizado com sucesso!");

      setTimeout(() => {
        onBack();
      }, 1000);
    } catch (error) {
      toast.error("Erro ao realizar o cadastro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (!form.name.trim()) {
      toast.error("Nome é obrigatório");
      return;
    }

    if (!form.email.trim()) {
      toast.error("E-mail é obrigatório");
      return;
    }

    if (!form.phone.trim()) {
      toast.error("Telefone é obrigatório");
      return;
    }

    if (!form.photo) {
      toast.error("Por favor, selecione uma foto de perfil");
      return;
    }

    setStep("senha");
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (!file.type.startsWith("image/")) {
        alert(
          "Por favor, selecione apenas arquivos de imagem (JPG, PNG, etc.)"
        );
        return;
      }

      // Limitar o tamanho para 5MB (5 * 1024 * 1024 bytes)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert("A imagem deve ter no máximo 5MB");
        return;
      }

      setForm({ ...form, photo: file });
    }
  };

  const removePhoto = () => {
    setForm({ ...form, photo: null });
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (files.length > 0) {
      const file = files[0];

      // Limitar o tamanho para 5MB
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("A imagem deve ter no máximo 5MB");
        return;
      }

      setForm({ ...form, photo: file });
    }
  };

  if (step === "senha") {
    return (
      <Form>
        <Field>
          <h2>Defina sua senha</h2>
          <p>Insira as informações para criar uma conta na plataforma.</p>
        </Field>
        <Field>
          <label>
            <span style={{ color: "red" }}>*</span> Senha
          </label>
          <Input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </Field>
        <Field>
          <label>
            <span style={{ color: "red" }}>*</span> Confirmação de senha
          </label>
          <Input
            type="password"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
          />
        </Field>

        <ul style={{ fontSize: "0.8rem", color: "#888", marginTop: "1rem" }}>
          <li>Pelo menos 1 caractere minúsculo</li>
          <li>Pelo menos 1 caractere maiúsculo</li>
          <li>Pelo menos 1 número</li>
          <li>Pelo menos 8 caracteres</li>
        </ul>

        <Button onClick={handleRegister} disabled={loading}>
          {loading ? "Cadastrando..." : "Confirmar"}
        </Button>
        <SecondaryButton onClick={onBack} disabled={loading}>
          Voltar para o Login
        </SecondaryButton>
      </Form>
    );
  }

  return (
    <Form>
      <Field>
        <h2>Cadastro</h2>
        <p>Insira as informações para criar uma conta na plataforma.</p>
      </Field>
      <Field>
        <label>
          <span style={{ color: "red" }}>*</span> Foto de Perfil
        </label>
        {!form.photo && (
          <ImageDropzone
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            htmlFor="foto"
          >
            <DropText>
              <strong>Clique aqui para fazer upload</strong>
              <br />
              <span>Da foto para o perfil.</span>
              <br />
              <small style={{ color: "#666", fontSize: "0.8rem" }}>
                Máximo 5MB - Apenas imagens (JPG, PNG, etc.)
              </small>
            </DropText>
            <input
              type="file"
              onChange={handleFotoChange}
              style={{ display: "none" }}
              id="foto"
              accept="image/*"
              disabled={loading}
            />
          </ImageDropzone>
        )}

        {form.photo && (
          <PreviewContainer>
            <div style={{ position: "relative" }}>
              <PreviewImage
                src={URL.createObjectURL(form.photo)}
                alt="preview"
              />
              <RemoveButton onClick={removePhoto} disabled={loading}>
                ×
              </RemoveButton>
            </div>
          </PreviewContainer>
        )}
      </Field>

      <Field>
        <label>
          <span style={{ color: "red" }}>*</span> Nome de Usuário
        </label>
        <Input
          placeholder="Digite o nome de usuário"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          disabled={loading}
        />
      </Field>
      <Field>
        <label>
          <span style={{ color: "red" }}>*</span> E-mail
        </label>
        <Input
          placeholder="Digite o seu e-mail"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          disabled={loading}
        />
        <CheckboxContainer>
          <input
            type="checkbox"
            checked={form.show_email}
            onChange={(e) => setForm({ ...form, show_email: e.target.checked })}
            disabled={loading}
          />
          <Label>Desejo mostrar no meu perfil</Label>
        </CheckboxContainer>
      </Field>
      <Field>
        <label>
          <span style={{ color: "red" }}>*</span> Telefone
        </label>
        <Input
          placeholder="Digite o seu telefone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          disabled={loading}
        />
        <CheckboxContainer>
          <input
            type="checkbox"
            checked={form.show_phone}
            onChange={(e) => setForm({ ...form, show_phone: e.target.checked })}
            disabled={loading}
          />
          <Label>Desejo mostrar no meu perfil</Label>
        </CheckboxContainer>
      </Field>

      <Field>
        <label>Instagram</label>
        <Input
          placeholder="Digite o seu @ do instagram"
          value={form.instagram}
          onChange={(e) => setForm({ ...form, instagram: e.target.value })}
          disabled={loading}
        />
        <CheckboxContainer>
          <input
            type="checkbox"
            checked={form.show_insta}
            onChange={(e) => setForm({ ...form, show_insta: e.target.checked })}
            disabled={loading}
          />
          <Label>Desejo mostrar no meu perfil</Label>
        </CheckboxContainer>
      </Field>

      <Button onClick={handleContinue} disabled={loading}>
        {loading ? "Processando..." : "Continuar"}
      </Button>
      <SecondaryButton onClick={onBack} disabled={loading}>
        Voltar para o Login
      </SecondaryButton>
    </Form>
  );
};
