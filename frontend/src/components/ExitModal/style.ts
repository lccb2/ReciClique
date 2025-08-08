import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 0.75rem;
  max-width: 500px;
  font-family: 'Montserrat', sans-serif;
`;

export const Title = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #333;
`;

export const Text = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 2rem;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

export const CancelButton = styled.button`
  padding: 0.5rem 1.5rem;
  background: #fff;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #ddd;
  }
`;

export const DeleteButton = styled.button`
  padding: 0.5rem 1.5rem;
  background: #d32f2f;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #b71c1c;
  }
`;
