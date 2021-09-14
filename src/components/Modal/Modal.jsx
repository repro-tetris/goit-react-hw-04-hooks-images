import React, { Component } from "react";
import PropTypes from "prop-types";

export class Modal extends Component {
  handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      this.closeModal();
    }
  };

  closeModal = () => {
    this.props.onClose();
  };

  handleEscKey = (e) => {
    if (e.code === "Escape") this.closeModal();
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleEscKey);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleEscKey);
  }

  render() {
    return (
      <div className="Overlay" onClick={this.handleCloseModal}>
        <div className="Modal">
          <img src={this.props.largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
  largeImageURL: PropTypes.string,
};

export default Modal;
