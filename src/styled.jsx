import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #282c34;
`;

export const Content = styled.div`
  background-color: #3a3f47;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.5);
  width: 320px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const History = styled.div`
  color: #aaa;
  font-size: 14px;
  text-align: right;
  margin-bottom: 5px;
`;
