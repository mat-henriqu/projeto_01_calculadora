/* eslint-disable react/prop-types */
import { ButtonContainer } from './styles';

const Button = ({ label, onClick }) => {
  return (
    <ButtonContainer onClick={onClick} type="button">
      {label}
    </ButtonContainer>
  );
}

export default Button;