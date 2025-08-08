import styled from 'styled-components';
import { ProfileBg, CoverBg } from '../../assets';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  font-family: 'Montserrat', sans-serif;
  background-image: url(${ProfileBg.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 2.5rem;
  margin-right: 2.5rem;
  background: #fff;
  border-radius: 1rem;
  max-height: calc(100vh - 5rem);
  overflow-y: auto;
  padding-bottom: 2rem;
  position: relative;
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

export const Divisor = styled.div`
  width: 95%;
  border-bottom: 0.75px solid #e3d7c7;
  margin-bottom: 2rem;
  align-self: center;
`;

export const Header = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  background-image: url(${CoverBg.src});
  background-size: cover;
  background-position: center;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;

  .profile-pic {
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid white;
    background-color: #fff;
    z-index: 1;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: 1.5rem 2rem;
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
    font-weight: bold;
    color: #4c3127;
  }

  .email {
    font-size: 0.8rem;
    color: #333;
  }

  .other {
    font-size: 0.95rem;
    color: #333;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .greeting {
    width: 100%;
    margin-top: 1rem;
    font-size: 1rem;
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
