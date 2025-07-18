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
`;

export const Divisor = styled.div`
  width: 95%;
  border-bottom: 0.75px solid #e3d7c7;
  margin-bottom: 2rem;
  align-self: center;
`;



export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;
  padding: 1rem 2rem;
  margin-bottom: 1rem;

  .logo-wrapper {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .logo-text {
    color: #4c3127;
    font-family: 'Amatic SC', cursive;
    font-size: 3rem;
    font-weight: 1000;
    line-height: 1;
  }

  .search {
    flex: 1;
    max-width: 100px;
    margin: 0 2rem;
    position: relative;
    align-self: flex-start;

  }

  .postagem {
    background: #A0B78A;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    padding: 1.7rem 1.2rem;
    font-size: 1rem;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    white-space: nowrap;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #8da671;
    }
  }
`;




export const FiltroBtn = styled.button<{ selected?: boolean }>`
  background: ${({ selected }) => (selected ? '#4c3127' : '#e0e0e0')};
  color: ${({ selected }) => (selected ? '#fff' : '#333')};
  border: none;
  padding: 0.5rem 0.8rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.875rem;

  &:hover {
    background: ${({ selected }) => (selected ? '#3b261e' : '#d5d5d5')};
  }
`;

export const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
  padding: 0 2rem;
`;
