import React, { Component } from "react";
import PropTypes from "prop-types";

import { ImageGalleryItem } from ".";

export class ImageGallery extends Component {
  render() {
    const { images } = this.props;

    return (
      <div>
        <ul className="ImageGallery">
          {images.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              onClick={() => this.props.onSelect(largeImageURL)}
            />
          ))}
        </ul>
      </div>
    );
  }
}

ImageGallery.propTypes = { images: PropTypes.array };

export default ImageGallery;
