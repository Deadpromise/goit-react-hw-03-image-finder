import { ImageListItem, ImageItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ smallImage, description, id }) => {
  return (
    <ImageListItem>
      <ImageItem id={id} src={smallImage} alt={description}></ImageItem>
    </ImageListItem>
  );
};
// onClick={imgCl
// function imgCl(e) {
//   console.log(e.currentTarget);
// }
