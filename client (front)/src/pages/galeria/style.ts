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
  margin: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
`;

export const Description = styled.h1`
  color: rgba(0, 0, 0, 0.88);
  font-family: 'Montserrat', sans-serif;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
`;

export const Divisor = styled.div`
  width: 95%;
  border-bottom: 0.75px solid #e3d7c7;
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

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
`;

export const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: 1.5rem 2rem 1.5rem 2rem; 
  font-family: 'Montserrat', sans-serif;

  .left {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.3rem;
  }

  .username {
    font-size: 1.25rem;
    font-weight: 500;
    color: #4c3127;
    font-weight: bold;
  }

  .email {
    font-size: 0.8rem;
    font-weight: 400;
    color: #333;
  }

  .other {
    font-size: 0.95rem;
    font-weight: 400;
    color: #333
  }

  .greeting {
    width: 100%;
    margin-top: 1rem;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    color: #333;
    text-align: left;
  }
`;

export const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
  padding: 0.25rem;
`;
