import styled from 'styled-components';

export const ButtonContainer = styled.button`
    padding: 20px;
    border: 1px solid #CDCDCD;
    background-color: #3a3f47;
    color: #FFFFFF;
    font-size: 24px;
    font-weight: 700;
    flex: 1;
    transition: background-color 0.2s, transform 0.2s;
    
    &:hover {
        background-color: #5a7f78;
        transform: scale(1.05);
        opacity: 0.8;
    }
`
