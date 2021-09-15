import PropTypes from "prop-types";

import { ImageGalleryItem } from ".";

export function ImageGallery({ images, onSelect }) {
  return (
    <div>
      <ul className="ImageGallery">
        {images.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onClick={() => onSelect(largeImageURL)}
          />
        ))}
      </ul>
    </div>
  );
}

ImageGallery.propTypes = { images: PropTypes.array };

export default ImageGallery;
