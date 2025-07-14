import styled from 'styled-components';
import { ProfileBg } from '../../assets';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  font-family: 'Montserrat', sans-serif;
  background-image: url(${ProfileBg.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const SideContainer = styled.aside`
  width: 260px;
  background-color: #9bb58d;
  color: #fff;
  position: relative;
  .bg {
    position: absolute;
    inset: 0;
    opacity: 0.1;
  }
  .menu {
    padding: 1rem;
    position: relative;
    z-index: 1;
    h4 {
      margin-bottom: 1rem;
    }
    ul {
      list-style: none;
      padding: 0;
      li {
        margin: 0.5rem 0;
      }
    }
  }
  .profile {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: absolute;
    bottom: 50px;
    left: 10px;
    right: 10px;
    background: #fff;
    color: #000;
    border-radius: 8px;
    padding: 0.5rem;
    img {
      border-radius: 50%;
    }
    div {
      p {
        margin: 0;
        font-weight: bold;
      }
      span {
        font-size: 0.8rem;
      }
    }
  }
  .logout {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    background: none;
    color: #fff;
    border: none;
    cursor: pointer;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 2.5rem;
  margin-right: 2.5rem;
  background: #fff;
  border-radius: 1rem;
`;

export const Title = styled.h1`
  color: #4C3127;
  font-family: "Amatic SC";
  font-size: 3.62831rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2.4945rem;
  margin: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Description = styled.h1`
color: rgba(0, 0, 0, 0.88);
font-family: 'Montserrat', sans-serif;
font-size:  0.875rem;
font-style: normal;
font-weight: 400;
`;


export const Divisor = styled.div`
  width: 95%;
  border-bottom: 0.75px solid #E3D7C7;
  margin-bottom: 2rem;
  align-self: center;
`;


export const Header = styled.div`
  position: relative;
  height: 120px;
  .profile-pic {
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    overflow: hidden;
  }
`;

export const Form = styled.form`
  margin-top: 60px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  textarea {
    display: flex;
    height: 3.25rem;
    padding:  0.25rem  0.6875rem;
    align-items: center;
    flex-shrink: 0;
    align-self: stretch;
    border-radius:  0.375rem;
    border: 1px solid #D9D9D9;
    background: #FFF;
    color: rgba(0, 0, 0, 0.25);
    font-family: 'Montserrat', sans-serif;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height:1.375rem;

    resize: none;
    width: 100%;
    margin-top: 1rem;

    &:focus {
      outline: none;
      border-color: rgba(0, 0, 0, 0.8); 
      color: rgba(0, 0, 0, 0.8);
    }

  }
  .actions {
    margin-top: auto;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;

    .delete {
      background: #fff;
      color: #fff;
      border-radius: 0.4575rem;
      border:  1px solid #BC1111;
      cursor: pointer;
      color: #BC1111;
      gap: 0.625rem;
      font-family: 'Montserrat', sans-serif;
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.71875rem; 
      padding: 0.4rem 1rem;
    }

    .save {
      color: #fff;
      cursor: pointer;
      gap: 0.625rem;
      border-radius: 0.4575rem;
      border: 1px solid #A0B78A;
      background: #A0B78A;
      font-family: 'Montserrat', sans-serif;
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.71875rem; 
      padding: 0.4rem 1rem;
    }
  }
`;


export const Row = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  label {
    flex: 1;
    display: flex;
    flex-direction: column;
    color: #000;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    input {
      display: flex;
      height: var(--Spacing-10, 2.5rem);
      padding: 0rem 0.75rem;
      align-items: center;
      align-self: stretch;
      border-radius: 0.375rem;
      border: 1px solid #D3D3D3;
      background: #FFF;
      margin-top: 0.4rem;
      color: #525252;
      font-family: Montserrat;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.3125rem; 
      &:focus {
        outline: none;
        border-color: rgba(0, 0, 0, 0.8); 
        color: rgba(0, 0, 0, 0.8);
      }
    }

    div {
      display: flex;
      align-items: center;
      gap: 0.4rem;

      margin-top: 0.2rem;
      font-size: 0.8rem;

      input[type="checkbox"] {
        margin: 0;
      }

      span {
        color: #000;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.3125rem; 
      }
    }
  }
`;
