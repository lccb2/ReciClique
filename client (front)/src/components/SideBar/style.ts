import styled from 'styled-components';

export const SideContainer = styled.aside`
  width: 220px;
  background-color: #9bb58d;
  color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 0;
  border-radius: 1rem;
  background: #A0B78A;
  box-shadow: 0px 0px 4px 0px #E1B28A;
  margin: 2.5rem;

  .bg {
    position: absolute;
    inset: 0;
    opacity: 0.1;
    z-index: 0;
  }

  .menu {
    position: relative;
    z-index: 1;
    padding: 1rem;

    h4 {
      margin-bottom: 1rem;
      font-size: 0.95rem;
      letter-spacing: 0.5px;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin: 0.8rem 0;
        cursor: pointer;
        font-size: 0.9rem;
        padding: 0.3rem 0.75rem; 
        border-radius: 5px;
        transition: background-color 0.3s;

        &:hover {
          background-color: #73513C; 
        }
      }

      
      li.selected {
        background-color: #4C3127; 
        color: #fff;
      }
    }
  }

  .user {
    position: relative;
    z-index: 1;
    padding: 1rem;

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.6rem;
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
          font-size: 0.85rem;
          font-weight: bold;
        }
        span {
          font-size: 0.55rem;
        }
      }
    }

    .logout {
      margin-top: 1rem;
      background: none;
      color: #fff;
      border: none;
      cursor: pointer;
      font-size: 0.9rem;
    }
  }
`;
