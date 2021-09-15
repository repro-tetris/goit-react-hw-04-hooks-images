import React, { useState } from "react";
import PropTypes from "prop-types";

export function Searchbar({ onSubmit }) {
  const [searchString, setSearchString] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchString);
    setSearchString("");
  };
  const handleOnChange = (e) => {
    setSearchString(e.target.value);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleOnSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleOnChange}
          value={searchString}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
