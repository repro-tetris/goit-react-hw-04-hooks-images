import { PIXABAY_API_KEY } from "../variables/statuses";

export const fetchImages = (searchString, page = 1) => {
  return fetch(
    `https://pixabay.com/api/?q=${searchString}&page=${page}&key=${PIXABAY_API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`No images with string "${searchString}"`));
  });
};
