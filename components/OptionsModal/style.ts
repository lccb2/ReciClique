import styled from 'styled-components';

export const Container = styled.div`
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

export const Option = styled.button`
  background: none;
  border: none;
  text-align: left;
  color: #4C3127;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.25rem 0;

  &:hover {
    color: #A0B78A;
  }
`;
