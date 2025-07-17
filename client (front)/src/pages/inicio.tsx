'use client';
import React from 'react';
import Postagem from 'components/Postagem'

export default function PaginaDeTeste() {
  return (
    <main style={{ padding: 32 }}>
      <Postagem
        userPhoto="/images/check.jpg"
        userName="carla.dev"
        dateTime="2025-07-17 22:15"
        projectTitle="Organizador de Tarefas com React"
        projectDescription="Um app simples de lista de tarefas com funcionalidades de adicionar, editar e remover tarefas."
        materials="React, TypeScript, Styled-components, Vite"
        tutorialLink="https://www.youtube.com/watch?v=0fYi8SGA20k"
        projectPhoto="/images/projeto-todo.jpg"
        liked={true}
        disliked={false}
        comments={[
          {
            id: 1,
            userPhoto: '/images/avatar2.jpg',
            userName: 'joao.js',
            dateTime: '2025-07-17 20:30',
            text: 'Muito bom! Vou usar como base pra um projeto meu.',
            liked: true,
            disliked: false,
          },
          {
            id: 2,
            userPhoto: '/images/avatar3.jpg',
            userName: 'marina.fullstack',
            dateTime: '2025-07-17 21:10',
            text: 'Adorei o design!',
            liked: false,
            disliked: false,
          },
        ]}
          onEdit={() => alert('Editar post')}
          onDelete={() => alert('Excluir post')}
          likes={0}
          dislikes={0}
        />
    </main>
  );
}
