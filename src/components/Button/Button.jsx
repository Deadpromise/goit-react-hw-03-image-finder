import { BtnContainer, LoadMoreBtn } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => (
  <BtnContainer>
    <LoadMoreBtn type="button" onClick={onClick}>
      Load more
    </LoadMoreBtn>
  </BtnContainer>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
