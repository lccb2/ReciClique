import styled from 'styled-components';

export const Container = styled.div`
  max-width: 35rem;
  min-width: 35rem;
  min-height: 25rem;
  margin: auto;
  padding: 1rem;
  font-family: 'Montserrat', sans-serif;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px #ddd;

  display: flex;
  flex-direction: column;

  h4 {
    margin: 1rem 0 0.5rem;
    color: rgba(0, 0, 0, 0.45);
    font-size: 0.625rem;
    font-weight: 400;
    line-height: 1.25rem;
    letter-spacing: 0.0625rem;
    font-family: 'Montserrat', sans-serif;
  }
`;

export const SearchInput = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input {
    height: 2.5rem;
    flex: 1;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #D9D9D9;
    background: #FFF;
    color: rgba(0, 0, 0, 0.25);
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    line-height: 1.5rem;
    &:focus {
      outline: none;
      border-color: rgba(0, 0, 0, 0.8); 
      color: rgba(0, 0, 0, 0.8);
    }
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    overflow: hidden;
  }
`;

export const Suggestions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0.5rem 0;
`;

export const Tag = styled.div<{ selected?: boolean }>`
  padding: 0.3rem 0.6rem;
  background-color: ${({ selected }) => (selected ? '#A0B78A' : '#eee')};
  color: ${({ selected }) => (selected ? '#fff' : 'rgba(0, 0, 0, 0.88)')};
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    opacity: 0.8;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
  color: #FFF;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.09375rem;
  font-weight: 400;
  line-height: 1.71875rem;

  .back {
    background: none;
    color: #A0B78A;
    border: 1px solid #A0B78A;
    padding: 0.4rem 1rem;
    border-radius: 0.46875rem;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    font-style: normal;
    font-weight:  400;
    line-height: 1.5rem; 

  }

  .filter {
    background: #A0B78A;
    color: #fff;
    border: 1px solid #A0B78A;
    padding: 0.4rem 1rem;
    border-radius: 0.46875rem;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    font-style: normal;
    font-weight:  400;
    line-height: 1.5rem; 
  }
`;

export const EmptyState = styled.div`
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.375rem;
  margin-top: 1rem;
`;
