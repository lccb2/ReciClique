import { useRouter } from 'next/router';
import { SideContainer } from './style';
import Image from 'next/image';
import { ProfileIcon } from '../../assets';
import { useState, useEffect } from 'react';
import { getUser } from 'api/user';

export default function SideBar() {
  const router = useRouter();
  const currentPath = router.pathname; 
  const [user, setUser] = useState<any | null>(null);

  const fetchUser = async() => {
    try {      
      const userId = Number(localStorage.getItem('user_id'));
      const user = await getUser(userId)

      setUser(user as any);
    } catch (error) {
      console.log(error, 'error')
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const backToLogin = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    router.push('/login');
  };

  const goToProfile = () => {
    router.push('/profile');
  };

  return (
    <>
      {user &&
        <SideContainer>
          <div className="menu">
            <h4>Abas de Navegação</h4>
            <ul>
              <li className={currentPath === '/inicio' ? 'selected' : ''} onClick={() => router.push('/inicio')}>📋 Tela Inicial</li>
              <li className={currentPath === '/minhagaleria' ? 'selected' : ''} onClick={() => router.push('/minhagaleria')}>🖼 Minha Galeria</li>
              <li className={currentPath === '/duvidas' ? 'selected' : ''} onClick={() => router.push('/duvidas')}>❓ Dúvidas</li>
            </ul>
          </div>

          <div className="user">
            <div className="user-info" onClick={goToProfile} style={{ cursor: 'pointer' }}>
              <Image src={user.photo} alt="User" width={40} height={40} />
              <div>
                <p style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '120px',
                  display: 'inline-block'
                }}>
                  {user.name}
                </p>
                <span style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '120px',
                  display: 'inline-block'
                }}>
                  {user.email}
                </span>
              </div>
            </div>
            <button className="logout" onClick={backToLogin}>⏏️ Sair</button>
          </div>
        </SideContainer>
      }
    </>
  );
}
