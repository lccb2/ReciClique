import { useState } from 'react';
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
  ForgotPassword,
  InputContainer,
  Field
} from './style';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { SideBg } from '../../assets';
import { Register } from 'pages/register';
import { login } from 'api/aut';

export default function Login() {
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', remember: true });

  const isFormValid = () => {
    if (isRegistering) return form.name && form.email && form.password;
    return form.email && form.password;
  };

  const handleLogin = async() => {
    if (isFormValid()) {
      try {
        const response = await login(form);

        localStorage.setItem('token', response.token);
        localStorage.setItem('user_id', response.id);

        router.push('/profile');
      } catch (error) {
        console.log(error);
      }
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
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
           </Field>
           <Field>
           <label> Senha </label>
          <Input
            type="password"
            placeholder="Digite a sua senha"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </Field>
          {!isRegistering && (
            <InputContainer>
              <CheckboxContainer>
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={e => setForm({ ...form, remember: e.target.checked })}
                />
                <Label>Lembrar de mim</Label>
              </CheckboxContainer>
              <ForgotPassword>Esqueceu a senha?</ForgotPassword>
            </InputContainer>
          )}

          <Button  onClick={handleLogin} disabled={!isFormValid()}>
            Entrar
          </Button>
          <SecondaryButton onClick={() => setIsRegistering(prev => !prev)}>
             Realizar Cadastro
          </SecondaryButton>
        </Form>
        </>
        )}
      </RightSide>
    </Container>
  );
}
