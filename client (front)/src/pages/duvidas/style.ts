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
        cursor: pointer;

        &.selected {
          font-weight: bold;
          text-decoration: underline;
          background: rgba(255, 255, 255, 0.15);
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
        }
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
  max-height: calc(100vh - 5rem); // altura máxima da tela
  overflow-y: auto; // scroll interno
  padding-bottom: 2rem;
`;

export const Title = styled.h1`
  color: #4c3127;
  font-family: 'Amatic SC';
  font-size: 3.62831rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2.4945rem;
  margin: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Divisor = styled.div`
  width: 95%;
  border-bottom: 0.75px solid #e3d7c7;
  margin-bottom: 2rem;
  align-self: center;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem;
  button {
    background-color: #A0B78A;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.875rem;
    transition: 0.2s ease;

    &:hover {
      background-color: #8ea977;
    }
  }
`;

export const FaqBox = styled.div`
  width: 95%
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 0 2rem;
  border: 0.75px solid #e3d7c7; 
  h2 {
    font-family: 'Montserrat', sans-serif;
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
    font-weight: 700;
    color: #4c3127;
  }
`;

export const FaqItem = styled.div`
  margin-bottom: 1.5rem;
`;

export const Question = styled.p`
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: #000;
`;

export const Answer = styled.p`
  font-size: 0.9rem;
  color: #333;
  margin-left: 1rem;
  line-height: 1.4rem;
  font-weight: 400;
`;
