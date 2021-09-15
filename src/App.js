import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchImages } from "./services/searchService";
import Searchbar from "./components/Searchbar/Searchbar";
import { ImageGallery } from "./components/ImageGallery";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import Loader from "./components/Loader/Loader";
import { STATUS } from "./variables/statuses";

export default function App() {
  const [page, setPage] = useState(1);
  const [searchString, setSearchString] = useState("");
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [showButton, setShowButton] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState(null);

  const handleSearchbarOnSubmit = (searchString) => {
    setSearchString(searchString);
    setPage(1);
    setImages([]);
    setStatus(STATUS.LOAD);
  };

  const handleSelectImage = (largeImageUrl) => setLargeImageUrl(largeImageUrl);

  const handleCloseModal = () => setLargeImageUrl(null);

  const handleClickLoadMoreButton = () => {
    setPage((prev) => prev + 1);
    setStatus(STATUS.LOAD);
  };

  useEffect(() => {
    console.log(searchString, page, status);
    if (status === STATUS.LOAD) {
      fetchImages(searchString, page)
        .then((images) => {
          if (images.hits.length === 0 && page === 1) {
            toast(`No images by string "${searchString}"`);
            setShowButton(false);
            setStatus(STATUS.IDLE);
            return;
          }

          const showButton = images.hits.length === 12;
          if (!showButton) {
            toast("It`s all");
          }

          setShowButton(showButton);
          setImages((prev) => [...prev, ...images.hits]);
          setStatus(STATUS.IDLE);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [status, page, searchString]);

  return (
    <div>
      <Searchbar onSubmit={handleSearchbarOnSubmit}></Searchbar>

      <ImageGallery images={images} onSelect={handleSelectImage} />
      {status === STATUS.LOAD && <Loader />}
      {showButton && <Button onClick={handleClickLoadMoreButton} />}
      {largeImageUrl && (
        <Modal largeImageURL={largeImageUrl} onClose={handleCloseModal} />
      )}
      {<ToastContainer />}
    </div>
  );
}
