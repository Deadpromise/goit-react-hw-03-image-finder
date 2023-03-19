import { ImageList } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

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

// onClick = { imgCl };
// function imgCl(e) {
//   console.log(e.target);
// }
