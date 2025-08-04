import { useState } from 'react';
import {
  Form,
  Input,
  Button,
  SecondaryButton,
  CheckboxContainer,
  Label,
  Field
} from './style';
import { useRouter } from 'next/router';
import { register } from '../../api/aut';

export const Register = ({ onBack }: { onBack: () => void }) => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    instagram: '',
    mostrarTelefone: true,
    mostrarInstagram: true,
    photo: null as File | null,
  });

  const [step, setStep] = useState<'form' | 'senha'>('form');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password != confirmPassword) {
      return;
    }

    try {
      await register({
        ...form,
        password
      });
  
      router.push('/login');
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, photo: e.target.files[0] });
    }
  };

  if (step === 'senha') {
    return (
      <Form>
        <Field>
        <h2>Defina sua senha</h2>
        <p>Insira as informações para criar uma conta na plataforma.</p>
        </Field>
        <Field>

        <label><span style={{color:'red'}}>*</span> Senha</label>
        <Input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Field>
        <Field>
        <label><span style={{color:'red'}}>*</span> Confirmação de senha</label>
        <Input type="password" placeholder="********" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </Field>

        <ul style={{fontSize: '0.8rem', color: '#888', marginTop: '1rem'}}>
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
      <label><span style={{color:'red'}}>*</span> Foto de Perfil</label>
      <div style={{
        border: '2px dashed #ccc',
        padding: '1.5rem',
        textAlign: 'center',
        borderRadius: '8px',
        cursor: 'pointer'
      }}>
        <input type="file" onChange={handleFotoChange} style={{ display: 'none' }} id="foto" />
        <label htmlFor="foto">
          <strong>Clique aqui para fazer upload</strong><br />
          <span>Da foto para o perfil.</span>
        </label>
      </div>
      </Field>

      <Field>
      <label><span style={{color:'red'}}>*</span> Nome de Usuário</label>
      <Input
        placeholder="Digite o nome de usuário"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      </Field>
      <Field>
        <label><span style={{color:'red'}}>*</span> E-mail</label>
        <Input
          placeholder="Digite o seu e-mail"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
      </Field>
      <Field>
      <label><span style={{color:'red'}}>*</span> Telefone</label>
      <Input
        placeholder="Digite o seu telefone"
        value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })}
      />
        <CheckboxContainer>
        <input
          type="checkbox"
          checked={form.mostrarTelefone}
          onChange={e => setForm({ ...form, mostrarTelefone: e.target.checked })}
        />
        <Label>Desejo mostrar no meu perfil</Label>
      </CheckboxContainer>
      </Field>

      <Field>
      <label>Instagram</label>
      <Input
        placeholder="Digite o seu @ do instagram"
        value={form.instagram}
        onChange={e => setForm({ ...form, instagram: e.target.value })}
      />
           <CheckboxContainer>
        <input
          type="checkbox"
          checked={form.mostrarInstagram}
          onChange={e => setForm({ ...form, mostrarInstagram: e.target.checked })}
        />
        <Label>Desejo mostrar no meu perfil</Label>
      </CheckboxContainer>
      </Field>

      <Button onClick={() => setStep('senha')}>Continuar</Button>
      <SecondaryButton onClick={onBack}>Voltar para o Login</SecondaryButton>
    </Form>
  );
};
