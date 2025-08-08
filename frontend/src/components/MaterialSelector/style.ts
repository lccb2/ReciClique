import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  font-family: 'Montserrat', sans-serif;
`;

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

interface LabelProps {
  active: boolean;
}

export const Label = styled.label`
  position: absolute;
  left: 16px;
  top: 14px;
  color: #888;
  font-size: 1rem;
  pointer-events: none;
  transition: all 0.2s ease;
  background: white;
  padding: 0 4px;

  /* Se o container com classe .active estiver focado OU tiver conteúdo */
  .active & {
    top: -10px;
    font-size: 0.8rem;
    font-weight: 600;
    color: #A0B78A;
  }
`;



export const InputField = styled.div`
  width: 100%;
  padding: 0.5rem;
  font-size: 0.875rem;
  border: 1px solid #D3D3D3;
  border-radius: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.3rem;
  min-height: 3rem;
  cursor: text;
  outline: none;
  font-family: 'Montserrat', sans-serif;

  &:focus-within {
    border-color: #A0B78A;
  }

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 0.875rem;
    min-width: 10ch;
    font-family: 'Montserrat', sans-serif;
    color: #333;
  }
`;

export const RequiredMark = styled.span`
  color: red;
  margin-left: 0.25rem;
`;

export const Tag = styled.div<{ selected?: boolean }>`
  padding: 0.3rem 0.6rem;
  background-color: ${({ selected }) => (selected ? '#A0B78A' : '#EEE')};
  color: ${({ selected }) => (selected ? '#FFF' : '#333')};
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.8rem;
  transition: 0.2s;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    opacity: 0.8;
  }
`;

export const Suggestions = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  box-shadow: 0 2px 6px #A0B78A;
  z-index: 10;
  max-height: 8rem;
  overflow-y: auto;
  width: 100%;

  div {
    padding: 0.5rem;
    cursor: pointer;
    font-size: 0.875rem;
    color: #000;

    &:hover {
      background-color: #f2f2f2;
    }
  }
`;
