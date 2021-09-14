import React, { Component } from "react";
import PropTypes from "prop-types";

export class ImageGalleryItem extends Component {
  handleOnClick = (e) => {
    this.props.onClick(this.props.largeImageURL);
  };
  render() {
    const { webformatURL } = this.props;
    return (
      <li className="ImageGalleryItem" onClick={this.handleOnClick}>
        <img src={webformatURL} alt="" className="ImageGalleryItem-image" />
      </li>
    );
  }
}
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;
