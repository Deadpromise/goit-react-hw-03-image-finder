import { ImageList } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ results }) => {
  return (
    <ImageList>
      {results.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem
          key={id}
          smallImage={webformatURL}
          description={tags}
        ></ImageGalleryItem>
      ))}
    </ImageList>
  );
};
