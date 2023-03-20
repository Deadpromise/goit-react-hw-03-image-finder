import { ImageListItem, ImageItem } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ smallImage, description, id }) => {
  return (
    <ImageListItem>
      <ImageItem id={id} src={smallImage} alt={description}></ImageItem>
    </ImageListItem>
  );
};

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
