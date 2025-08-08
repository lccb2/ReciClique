import { useState } from "react";
import {
  Container,
  LeftSide,
  RightSide,
  Title,
  Form,
  Input,
  Button,
  SecondaryButton,
  CheckboxContainer,
  Label,
  InputContainer,
  Field,
} from "./style";
import { useRouter } from "next/router";
import Image from "next/image";
import { SideBg } from "../../assets";
import { Register } from "pages/register";
import { login } from "api/aut";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    remember: true,
  });

  const isFormValid = () => {
    if (isRegistering) return form.name && form.email && form.password;
    return form.email && form.password;
  };

  const handleLogin = async () => {
    if (!form.email.trim()) {
      toast.error("E-mail é obrigatório");
      return;
    }

    if (!form.password.trim()) {
      toast.error("Senha é obrigatória");
      return;
    }

    setLoading(true);
    try {
      const response = await login(form);

      console.log(response, 'response');

      localStorage.setItem("token", response.token);
      localStorage.setItem("user_id", response.id);

      toast.success("Login realizado com sucesso!");
      router.push("/profile");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao realizar o login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <LeftSide>
        <Image src={SideBg} alt="Side background" fill />
      </LeftSide>
      <RightSide>
        {isRegistering ? (
          <Register onBack={() => setIsRegistering(false)} />
        ) : (
          <>
            <Title>Reciclique</Title>
            <Form>
              <Field>
                <h2>Entrar</h2>
                <p>Insira as suas informações para acessar a plataforma.</p>
              </Field>
              <Field>
                <label> Email </label>
                <Input
                  type="email"
                  placeholder="Digite o seu e-mail"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={loading}
                />
              </Field>
              <Field>
                <label> Senha </label>
                <Input
                  type="password"
                  placeholder="Digite a sua senha"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  disabled={loading}
                />
              </Field>
              {!isRegistering && (
                <InputContainer>
                  <CheckboxContainer>
                    <input
                      type="checkbox"
                      checked={form.remember}
                      onChange={(e) =>
                        setForm({ ...form, remember: e.target.checked })
                      }
                      disabled={loading}
                    />
                    <Label>Lembrar de mim</Label>
                  </CheckboxContainer>
                </InputContainer>
              )}

              <Button
                onClick={handleLogin}
                disabled={loading || !isFormValid()}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
              <SecondaryButton
                onClick={() => setIsRegistering((prev) => !prev)}
                disabled={loading}
              >
                Realizar Cadastro
              </SecondaryButton>
            </Form>
          </>
        )}
      </RightSide>
    </Container>
  );
}
