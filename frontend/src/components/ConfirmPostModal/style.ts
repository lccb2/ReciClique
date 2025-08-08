import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 0.75rem; 
    background-color: #ffffff; 
    padding: 1.25rem;
    border-radius: 1rem;
    border: 1px solid #dcdcdc;
    font-family: 'Montserrat', sans-serif;
    max-width: 500px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;


export const Icon = styled.img`
    width: 24px;
    height: 24px;
    margin-top: 0.25rem;
    flex-shrink: 0;
`;


export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;


export const Title = styled.h4`
    font-size: 1.125rem;
    color: #4c3127;
    margin: 0;
    font-weight: 600;
`;


export const Message = styled.p`
    font-size: 0.95rem;
    color: #4c3127;
    margin: 0.5rem 0 0;
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background: none;
    border: none;
    cursor: pointer;
`;