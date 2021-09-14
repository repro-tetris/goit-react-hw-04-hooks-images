import React, { Component } from "react";
import PropTypes from "prop-types";

export class Searchbar extends Component {
  state = {
    searchString: "",
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchString);
    this.setState({ searchString: "" });
  };
  handleOnChange = (e) => {
    this.setState({ searchString: e.target.value });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleOnSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleOnChange}
            value={this.state.searchString}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
