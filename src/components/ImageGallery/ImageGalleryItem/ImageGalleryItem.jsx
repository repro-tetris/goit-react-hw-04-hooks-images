import PropTypes from "prop-types";

export function ImageGalleryItem({ webformatURL, largeImageURL, onClick }) {
  const handleOnClick = (e) => {
    onClick(largeImageURL);
  };

  return (
    <li className="ImageGalleryItem" onClick={handleOnClick}>
      <img src={webformatURL} alt="" className="ImageGalleryItem-image" />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;
