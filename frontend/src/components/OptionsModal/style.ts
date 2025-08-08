import styled from 'styled-components';

export const ModalContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: 'Montserrat', sans-serif;
  width: 180px;
`;

export const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Option = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  color: #333;
  background: none;
  border: none;
  text-align: left;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f0f0f0;
  }
`;