import styled from "styled-components";


export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalContainer = styled.div`
  background: #fff;
  width: 100%;
  max-width: 540px;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  font-family: Montserrat, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  h2 {
    font-size: 1.6rem;
    font-weight: bold;
    color: #000;
    margin: 0;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #000;
  font-size: 1rem;
  font-weight: 400;
  font-family: Montserrat;
`;


export const RequiredMark = styled.span`
  color: red;
  margin-left: 4px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 18px 16px 6px 16px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1.8px solid #ccc;
  resize: none;
  font-family: Montserrat, sans-serif;
  background-color: white;
  outline: none;

  &:focus {
    border-color: #A0B78A;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;

  button {
    flex: 1;
  }
`;

export const Button = styled.button<{ cancel?: boolean }>`
  padding: 14px 0;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 0;
  background-color: ${({ cancel }) => (cancel ? '#f0f0f0ff' : '#A0B78A')};
  color: ${({ cancel }) => (cancel ? '#000' : '#FFF')};
  cursor: pointer;
  font-family: Montserrat, sans-serif;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ cancel }) => (cancel ? '#c7c7c7ff' : '#8c9c6a')};
  }

  &:first-child {
    border-bottom-left-radius: 12px;
  }

  &:last-child {
    border-bottom-right-radius: 12px;
  }
`;
