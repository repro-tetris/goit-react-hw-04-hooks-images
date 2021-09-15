import React, { useEffect } from "react";
import PropTypes from "prop-types";

export function Modal({ largeImageURL, onClose }) {
  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEscKey = (e) => {
      if (e.code === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscKey);
    return () => {
      document.body.style.overflow = "visible";
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);

  return (
    <div className="Overlay" onClick={handleCloseModal}>
      <div className="Modal">
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  largeImageURL: PropTypes.string,
};

export default Modal;
