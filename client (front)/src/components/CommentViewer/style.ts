import styled from 'styled-components';

export const CommentBox = styled.div`
  background: #edefe2;
  padding: 16px 20px;
  max-width: 700px;
  border-left: 6px solid #a0b78a;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const Avatar = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const NameDate = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.span`
  font-weight: bold;
  color: #333;
`;

export const DateText = styled.span`
  font-size: 12px;
  color: #777;
`;

export const Text = styled.p`
  margin: 10px 0 14px 0;
  font-size: 14px;
  color: #333;
  line-height: 1.4;
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const NavButton = styled.button<{ disabled?: boolean }>`
  background: none;
  border: none;
  padding: 4px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: ${({ disabled }) => (disabled ? '#ccc' : '#333')};
`;

export const IconsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
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
