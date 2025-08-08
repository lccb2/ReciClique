import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  font-family: 'Montserrat', sans-serif;
  background-color: #FFF;
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
  color: #4C3127;
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
    color: #484C52;
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

  label{
    color: #000;
    font-family: Montserrat;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.37rem;
`;

export const Input = styled.input`
  padding: 0.75rem;
  height: 2.5rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #D3D3D3;
  outline: none;

  &:focus {
    border-color: #A4B78C;
  }
`;


export const Button = styled.button<{ disabled?: boolean }>`
  padding: 0.625rem;
  font-size: 1rem;
  background-color: ${({ disabled }) => (disabled ? '#808080' : '#A0B78A')};
  border: none;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: #FFF;
  font-family: Montserrat;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const SecondaryButton = styled.button`
  padding: 0.625rem;
  font-size: 1rem;
  border: 1.5px solid #A0B78A;
  color: #A0B78A;
  border-radius: 8px;
  background-color: transparent;
  cursor: pointer;
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
  font-size: 0.9rem;
  color: #000;
`;


export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
