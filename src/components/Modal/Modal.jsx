import { Component } from 'react';
import { ModalOverlay, ModalWindow, ModalImage } from './Modal.styled';

export class Modal extends Component {
  render() {
    const { onClose, imgUrl, imgAlt } = this.props;
    return (
      <ModalOverlay onClick={onClose}>
        <ModalWindow>
          <ModalImage src={imgUrl} alt={imgAlt}></ModalImage>
        </ModalWindow>
      </ModalOverlay>
    );
  }
}
