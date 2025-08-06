import { useState } from "react";
import {
  Form,
  Input,
  Button,
  SecondaryButton,
  CheckboxContainer,
  Label,
  Field,
} from "./style";
import { useRouter } from "next/router";
import { register } from "../../api/aut";

export const Register = ({ onBack }: { onBack: () => void }) => {
  const router = useRouter();
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
    if (password != confirmPassword) {
      return;
    }

    if (!form.photo) {
      alert("Por favor, selecione uma foto de perfil");
      return;
    }

    try {
      const response = await register({
        name: form.name,
        email: form.email,
        password,
        phone: form.phone,
        photo: form.photo,
        show_email: form.show_email,
        show_phone: form.show_phone,
        show_insta: form.show_insta,
      });

      if (response.status === 200) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error, "error");
    }
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
          />
        </Field>

        <ul style={{ fontSize: "0.8rem", color: "#888", marginTop: "1rem" }}>
          <li>Pelo menos 1 caractere minúsculo</li>
          <li>Pelo menos 1 caractere maiúsculo</li>
          <li>Pelo menos 1 número</li>
          <li>Pelo menos 8 caracteres</li>
        </ul>

        <Button onClick={handleRegister}> Confirmar</Button>
        <SecondaryButton onClick={onBack}>Voltar para o Login</SecondaryButton>
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
        <div
          style={{
            border: "2px dashed #ccc",
            padding: "1.5rem",
            textAlign: "center",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          <input
            type="file"
            onChange={handleFotoChange}
            style={{ display: "none" }}
            id="foto"
            accept="image/*"
          />
          <label htmlFor="foto">
            <strong>Clique aqui para fazer upload</strong>
            <br />
            <span>Da foto para o perfil.</span>
            <br />
            <small style={{ color: "#666", fontSize: "0.8rem" }}>
              Máximo 5MB - Apenas imagens (JPG, PNG, etc.)
            </small>
          </label>
        </div>
      </Field>

      <Field>
        <label>
          <span style={{ color: "red" }}>*</span> Nome de Usuário
        </label>
        <Input
          placeholder="Digite o nome de usuário"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
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
        />
        <CheckboxContainer>
          <input
            type="checkbox"
            checked={form.show_email}
            onChange={(e) => setForm({ ...form, show_email: e.target.checked })}
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
        />
        <CheckboxContainer>
          <input
            type="checkbox"
            checked={form.show_phone}
            onChange={(e) => setForm({ ...form, show_phone: e.target.checked })}
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
        />
        <CheckboxContainer>
          <input
            type="checkbox"
            checked={form.show_insta}
            onChange={(e) => setForm({ ...form, show_insta: e.target.checked })}
          />
          <Label>Desejo mostrar no meu perfil</Label>
        </CheckboxContainer>
      </Field>

      <Button onClick={() => setStep("senha")}>Continuar</Button>
      <SecondaryButton onClick={onBack}>Voltar para o Login</SecondaryButton>
    </Form>
  );
};
