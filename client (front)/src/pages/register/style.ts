import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  font-family: "Montserrat", sans-serif;
  background-color: #fff;
`;

export const LeftSide = styled.div`
  width: 50%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
`;

export const Cadastro = styled.div`
  width: 50%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
`;

export const RightSide = styled.div`
  width: 50%;
  height: 100vh;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  color: #4c3127;
  font-family: "Amatic SC";
  font-size: 3.62831rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2.4945rem;
  padding-bottom: 3.6875rem;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    color: #484c52;
    font-family: Montserrat;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.0125rem;
  }

  p {
    color: #525252;
    font-family: Montserrat;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.3125rem;
  }
  label {
    color: #000;
    font-family: Montserrat;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

export const Input = styled.input<{ disabled?: boolean }>`
  padding: 0.75rem;
  height: 2.5rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #d3d3d3;
  outline: none;
  background-color: ${({ disabled }) => (disabled ? "#f5f5f5" : "#fff")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "text")};

  &:focus {
    border-color: #a4b78c;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.37rem;
`;

export const Button = styled.button<{ disabled?: boolean }>`
  padding: 0.625rem;
  font-size: 1rem;
  background-color: ${({ disabled }) => (disabled ? "#808080" : "#A0B78A")};
  border: none;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  color: #fff;
  font-family: Montserrat;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const SecondaryButton = styled.button<{ disabled?: boolean }>`
  padding: 0.625rem;
  font-size: 1rem;
  border: 1.5px solid ${({ disabled }) => (disabled ? "#ccc" : "#a0b78a")};
  color: ${({ disabled }) => (disabled ? "#ccc" : "#a0b78a")};
  border-radius: 8px;
  background-color: transparent;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-family: Montserrat;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Label = styled.label`
  color: #000;
  font-family: Montserrat;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.3125rem;
`;

export const ForgotPassword = styled.a`
  font-size: 0.9rem;
  color: #666;
  text-decoration: none;
  cursor: pointer;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ImageDropzone = styled.label`
  border: 2px dashed #ccc;
  border-radius: 10px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s;
  font-family: "Montserrat", sans-serif;

  &:hover {
    border-color: #a0b78a;
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
  margin-top: 12px;
`;

export const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  border: 1.5px solid #ccc;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export const RemoveButton = styled.button<{ disabled?: boolean }>`
  position: absolute;
  top: -6px;
  right: -6px;
  background: white;
  color: ${({ disabled }) => (disabled ? "#ccc" : "#444")};
  border: 1px solid ${({ disabled }) => (disabled ? "#ccc" : "#ccc")};
  border-radius: 50%;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 14px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;
