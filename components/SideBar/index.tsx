import { useState } from 'react';
import {
  SideContainer,
} from './style';
import { useRouter } from 'next/router';
import { ProfileIcon } from '../../assets';
import Image from 'next/image';

export default function SideBar() {
  const router = useRouter();

  const backToLogin = () => {
      router.push('/login');    
  };
  return (
    <SideContainer>
      <div className="menu">
        <h4>Abas de Navegação</h4>
        <ul>
          <li>📋 Tela Inicial</li>
          <li>🖼 Minha Galeria</li>
          <li>❓ Dúvidas</li>
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
        <button className="logout"  onClick={backToLogin} >⏏️ Sair</button>
      </div>
    </SideContainer>
  );
}