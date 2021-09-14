import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchImages } from "./services/searchService";
import Searchbar from "./components/Searchbar/Searchbar";
import { ImageGallery } from "./components/ImageGallery";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import Loader from "./components/Loader/Loader";
import { STATUS } from "./variables/statuses";

export class App extends Component {
  state = {
    page: 1,
    searchString: "",
    images: [],
    status: STATUS.IDLE,
    showButton: false,
    largeImageUrl: null,
    isLoading: false,
  };

  handleSearchbarOnSubmit = (searchString) => {
    this.setState({
      searchString,
      page: 1,
      images: [],
      status: STATUS.LOAD,
    });
  };

  handleSelectImage = (largeImageUrl) => {
    this.setState({ largeImageUrl });
  };

  handleCloseModal = () => {
    this.setState({ largeImageUrl: null });
  };

  handleClickLoadMoreButton = () => {
    this.setState((prevState) => {
      return { page: prevState.page + 1, status: STATUS.LOAD };
    });
  };

  componentDidUpdate() {
    const { status, page, searchString } = this.state;

    if (status === STATUS.LOAD) {
      fetchImages(searchString, page)
        .then((images) => {
          if (images.hits.length === 0 && page === 1) {
            toast(`No images by string "${searchString}"`);
            this.setState({ status: STATUS.IDLE, showButton: false });
            return;
          }

          const showButton = images.hits.length === 12;
          if (!showButton) {
            toast("It`s all");
          }
          this.setState({
            images: [...this.state.images, ...images.hits],
            status: STATUS.IDLE,
            showButton,
          });
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }

  render() {
    const { status, showButton, largeImageUrl, images } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearchbarOnSubmit}></Searchbar>

        <ImageGallery images={images} onSelect={this.handleSelectImage} />
        {status === STATUS.LOAD && <Loader />}
        {showButton && <Button onClick={this.handleClickLoadMoreButton} />}
        {largeImageUrl && (
          <Modal
            largeImageURL={largeImageUrl}
            onClose={this.handleCloseModal}
          />
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
