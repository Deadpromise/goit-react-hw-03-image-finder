import { BtnContainer, LoadMoreBtn } from './Button.styled';

export const Button = ({ onClick }) => (
  <BtnContainer>
    <LoadMoreBtn type="button" onClick={onClick}>
      Load more
    </LoadMoreBtn>
  </BtnContainer>
);
