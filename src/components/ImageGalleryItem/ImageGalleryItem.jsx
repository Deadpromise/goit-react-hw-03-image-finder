import { ImageListItem, ImageItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ smallImage, description }) => {
  return (
    <ImageListItem>
      <ImageItem src={smallImage} alt={description}></ImageItem>
    </ImageListItem>
  );
};
