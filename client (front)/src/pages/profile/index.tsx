import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Container, MainContent, Header, Form, Row, Title, Divisor, Description } from './style';
import { SideBar } from '../../components';
import { CoverBg, Logo } from '../../assets';
import DeleteAccountModal from '../../components/DeleteAccountModal';
import { deleteUser, getUser, updateUser } from 'api/user';
import { useRouter } from 'next/router';

export default function Profile() {
  const router = useRouter();

  // estados para controlar os campos do form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [greeting, setGreeting] = useState('');
  const [photo, setPhoto] = useState('');

  const [user, setUser] = useState<any | null>(null);

  // estado para controlar o modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // abrir modal
  const openDeleteModal = () => setIsDeleteModalOpen(true);

  // fechar modal
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  // confirmar exclusão
  const handleConfirmDelete = async() => {
    try {
      await deleteUser();
      router.push('/')
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const fetchUser = async() => {
    try {      
      const userId = Number(localStorage.getItem('user_id'));
      const user = await getUser(userId);

      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setInstagram(user.instagram);
      setGreeting(user.greeting);
      setPhoto(user.photo);
  
      setUser(user as any);
    } catch (error) {
      console.log(error, 'error')
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // salvar os dados no localStorage
  const handleSave = async(e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {      
      const profileData = { name, email, phone, instagram, greeting };
  
      await updateUser(profileData);

      window.location.reload();
    } catch (error) {
      console.log(error, 'error');
    }
  };

  return (
    <>
      { user && 
        <Container>
          <SideBar />
          <MainContent>
            <Title>
              <Image src={Logo} alt="Logo" width={49} height={53} />
              Reciclique
            </Title>
            <Divisor />
            <Header>
              <Image src={CoverBg} alt="Cover" fill />
              <div className="profile-pic">
                <Image src={photo} alt="Profile" width={80} height={80} />
              </div>
            </Header>
            <Form onSubmit={handleSave}>
              <Row>
                <label>
                  <span><span style={{ color: 'red' }}>*</span> Nome de Usuário</span>
                  <input
                    placeholder="Digite o nome de usuário"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>
                <label>
                  <span><span style={{ color: 'red' }}>*</span> E-mail </span>
                  <input
                    type="Email"
                    placeholder="Digite o seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div>
                    <input type="checkbox" id="showEmail" />
                    <span>Desejo mostrar no meu perfil</span>
                  </div>
                </label>
                <label>
                  <span><span style={{ color: 'red' }}>*</span> Telefone </span>
                  <input
                    placeholder="Digite o seu telefone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <div>
                    <input type="checkbox" id="showPhone" />
                    <span>Desejo mostrar no meu perfil</span>
                  </div>
                </label>
                <label>
                  Instagram
                  <input
                    placeholder="Digite o seu @ do Instagram"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                  <div>
                    <input type="checkbox" id="showInstagram" />
                    <span>Desejo mostrar no meu perfil</span>
                  </div>
                </label>
              </Row>
              <Description>
                Mensagem de saudação
              </Description>
              <textarea
                placeholder="Insira uma breve saudação"
                value={greeting}
                onChange={(e) => setGreeting(e.target.value)}
              />
              <div className="actions">
                <button
                  type="button"
                  className="delete"
                  onClick={openDeleteModal} // abre modal ao clicar
                >
                  ✖ Apagar Conta
                </button>
                <button type="submit" className="save">✅ Salvar alterações</button>
              </div>
            </Form>

            {/* Modal de confirmação para apagar conta */}
            <DeleteAccountModal
              isOpen={isDeleteModalOpen}
              onCancel={closeDeleteModal}
              onConfirmDelete={handleConfirmDelete}
            />
          </MainContent>
        </Container>
      }
    </>
  );
}
