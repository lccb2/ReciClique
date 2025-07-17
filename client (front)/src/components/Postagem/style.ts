import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 95%;
  background: #FFFCF8;
  border: 2px solid #e3d7c7; 
  border-radius: 12px;
  margin: 1.5rem auto 2rem auto;
  padding: 1.5rem 2rem;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

export const LeftContent = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

export const RightContent = styled.div`
  flex: 1;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  min-height: 200px;
`;

export const ProjectImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;  
  gap: 1rem;
  color: #4C3127;
`;

export const UserPhoto = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; 
  }
`;

export const UserNameDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #4C3127;

  strong {
    font-weight: 700;
    font-size: 1rem;
  }
`;

export const DateTime = styled.span`
  font-size: 0.75rem;
  color: #555;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const ActionButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1.3rem;
  color: #5C3A21;
  display: flex;
  align-items: center;

  &:hover {
    color: #8B5E3C;
  }
`;

export const ProjectTitle = styled.h2`
  font-weight: 700;
  margin: 0 0 0.3rem 0;
  font-size: 1.3rem;
  color: #4C3127;
`;

export const ProjectDescription = styled.p`
  margin: 0 0 1rem 0;
  line-height: 1.3;
  color: #4C3127;
`;

export const SectionTitle = styled.h3`
  margin: 0 0 0.3rem 0;
  font-weight: 600;
  font-size: 1rem;
  color: #4C3127;
`;

export const SectionText = styled.p`
  margin: 0 0 1rem 0;
  color: #4C3127;
  line-height: 1.2;
`;

export const TutorialLink = styled.a`
  color: #1A1CB3;
  font-weight: 600;
  text-decoration: underline;
  margin-bottom: 1rem;
  display: inline-block;

  &:hover {
    color: #8B5E3C;
  }
`;

export const IconsRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  margin-bottom: 1rem;
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.4rem;
  color: #4C3127;

  &:hover {
    color: #8B5E3C;
  }
`;

/* Comentários */

export const CommentsSection = styled.div`
  width: 90%;
  background: #E3E3E3; 
  border-radius: 10px;
  margin: 0 auto 1.5rem auto;
  padding: 1rem 1.5rem;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
`;

export const CommentItem = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: flex-start; 
`;

export const CommentUserPhoto = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* Espaço entre header, texto e ícones */
  flex: 1; /* Ocupa o espaço restante */
  color: #4C3127;
`;

export const CommentActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.5rem;
  color: #5C3A21;
`;


export const CommentHeader = styled.div`
  display: flex;
  flex-direction: column;    
  align-items: flex-start;   
  text-align: left;
  gap: 0.2rem;
  color: #4C3127;
  font-size: 0.754rem;
`;

export const CommentDateTime = styled.span`
  font-size: 0.50rem;
  color: #555;
  text-align: left;
`;

export const CommentText = styled.p`
  margin: 0.25rem 0 0 0;
  color: #444;
  font-size: 0.9rem;
  line-height: 1.3;
  text-align: left;
  align-items: flex-start;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: flex;
  flex-direction: column;

  button {
    background: none;
    border: none;
    padding: 0.5rem 1rem;
    text-align: left;
    cursor: pointer;
    color: #4c3127;
    font-size: 0.9rem;
    white-space: nowrap;

    &:hover {
      background-color: #f2f2f2;
    }
  }
`;

export const InteractionButton = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;

  svg {
    font-size: 16px;
    color: ${({ active }) => (active ? '#c04f4f' : '#666')};
    transition: color 0.2s;
  }

  span {
    font-size: 13px;
    color: #333;
  }

  &:hover svg {
    color: #c04f4f;
  }
`;
