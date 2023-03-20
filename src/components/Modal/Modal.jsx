import { Component } from 'react';
import { ModalOverlay, ModalWindow, ModalImage } from './Modal.styled';
import PropTypes from 'prop-types';

export class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    imgUrl: PropTypes.string.isRequired,
    imgAlt: PropTypes.string.isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }
  onKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { imgUrl, imgAlt } = this.props;
    return (
      <ModalOverlay onClick={this.onBackdropClick}>
        <ModalWindow>
          <ModalImage src={imgUrl} alt={imgAlt}></ModalImage>
        </ModalWindow>
      </ModalOverlay>
    );
  }
}
