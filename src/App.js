import { useState, useEffect, useRef } from "react";
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
  const page = useRef(1);
  const searchString = useRef("");
  const imagesRef = useRef([]);

  const [status, setStatus] = useState(STATUS.IDLE);
  const [showButton, setShowButton] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState(null);

  const handleSearchbarOnSubmit = (searchStr) => {
    searchString.current = searchStr;
    imagesRef.current = [];
    page.current = 1;
    setStatus(STATUS.LOAD);
  };

  const handleSelectImage = (largeImageUrl) => setLargeImageUrl(largeImageUrl);

  const handleCloseModal = () => setLargeImageUrl(null);

  const handleClickLoadMoreButton = () => {
    page.current += 1;
    setStatus(STATUS.LOAD);
  };

  const changeState = ({ status = STATUS.IDLE, showButton }) => {
    setShowButton(showButton);
    setStatus(status);
  };

  useEffect(() => {
    console.log(searchString.current, page.current, status);
    if (status === STATUS.LOAD) {
      fetchImages(searchString.current, page.current)
        .then((images) => {
          if (images.hits.length === 0 && page.current === 1) {
            toast(`No images by string "${searchString.current}"`);
            changeState({ showButton: false });

            return;
          }
          const showButton = images.hits.length === 12;
          if (!showButton) {
            toast("It`s all");
          }
          imagesRef.current = [...imagesRef.current, ...images.hits];
          changeState({ showButton });
        })
        .catch((error) => {
          toast.error(error.message);
          changeState({ showButton: false });
        });
    }
  }, [status]);

  return (
    <div>
      <Searchbar onSubmit={handleSearchbarOnSubmit}></Searchbar>

      <ImageGallery images={imagesRef.current} onSelect={handleSelectImage} />
      {status === STATUS.LOAD && <Loader />}
      {showButton && <Button onClick={handleClickLoadMoreButton} />}
      {largeImageUrl && (
        <Modal largeImageURL={largeImageUrl} onClose={handleCloseModal} />
      )}
      {<ToastContainer />}
    </div>
  );
}
