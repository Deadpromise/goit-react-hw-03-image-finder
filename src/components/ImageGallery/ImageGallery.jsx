import { ImageList } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ results, onClick }) => {
  return (
    <ImageList onClick={onClick}>
      {results.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          smallImage={webformatURL}
          description={tags}
        ></ImageGalleryItem>
      ))}
    </ImageList>
  );
};

ImageGallery.propTypes = {
  results: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
