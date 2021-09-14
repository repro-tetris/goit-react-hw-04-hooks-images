import React, { Component } from "react";
import PropTypes from "prop-types";

export class Button extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <button className="Button" onClick={onClick}>
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
