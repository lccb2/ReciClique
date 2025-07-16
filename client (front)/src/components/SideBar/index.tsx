import { useRouter } from 'next/router';
import { SideContainer } from './style';
import Image from 'next/image';
import { ProfileIcon } from '../../assets';

export default function SideBar() {
  const router = useRouter();
  const currentPath = router.pathname; 

  const backToLogin = () => {
    router.push('/login');
  };

  return (
    <SideContainer>
      <div className="menu">
        <h4>Abas de Navegação</h4>
        <ul>
          <li className={currentPath === '/' ? 'selected' : ''} onClick={() => router.push('/')}>📋 Tela Inicial</li>
          <li className={currentPath === '/minhagaleria' ? 'selected' : ''} onClick={() => router.push('/minhagaleria')}>🖼 Minha Galeria</li>
          <li className={currentPath === '/duvidas' ? 'selected' : ''} onClick={() => router.push('/duvidas')}>❓ Dúvidas</li>
        </ul>
      </div>

      <div className="user">
        <div className="user-info">
          <Image src={ProfileIcon} alt="User" width={40} height={40} />
          <div>
            <p>Caio M. Lopes</p>
            <span>cainho@gmail.com</span>
          </div>
        </div>
        <button className="logout" onClick={backToLogin}>⏏️ Sair</button>
      </div>
    </SideContainer>
  );
}
