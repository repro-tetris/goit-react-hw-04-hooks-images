import React, { Component } from "react";
import LoaderSpinner from "react-loader-spinner";
export class Loader extends Component {
  render() {
    return (
      <div className="Overlay">
        <LoaderSpinner type="Puff" color="#00BFFF" height={100} width={100} />
      </div>
    );
  }
}

export default Loader;
