import styled from 'styled-components';

const fontFamily = `Montserrat, sans-serif`;

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
  min-height: 580px;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  font-family: ${fontFamily};
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
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
  position: absolute;
  left: 16px;
  top: 14px;
  color: #888;
  font-size: 1rem;
  pointer-events: none;
  transition: all 0.2s ease;
  background: white;
  padding: 0 4px;

  input:focus + &,
  textarea:focus + &,
  input:not(:placeholder-shown) + &,
  textarea:not(:placeholder-shown) + & {
    top: -10px;
    font-size: 0.8rem;
    font-weight: 600;
    color: #A0B78A;
  }
`;

export const RequiredMark = styled.span`
  color: red;
  margin-left: 4px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 18px 16px 6px 16px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1.8px solid #ccc;
  font-family: ${fontFamily};
  background-color: white;
  outline: none;

  &:focus {
    border-color: #A0B78A;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 18px 16px 6px 16px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1.8px solid #ccc;
  resize: none;
  font-family: ${fontFamily};
  background-color: white;
  outline: none;

  &:focus {
    border-color: #A0B78A;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 0;
  width: 100%;
  margin-top: 16px;

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
  font-family: ${fontFamily};
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

export const ImageDropzone = styled.label`
  border: 2px dashed #ccc;
  border-radius: 10px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s;
  font-family: ${fontFamily};

  &:hover {
    border-color: #A0B78A;
  }
`;

export const DropText = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin: 0;
`;

export const PreviewContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: -8px;
`;

export const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  border: 1.5px solid #ccc;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: -6px;
  right: -6px;
  background: white;
  color: #444;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;
