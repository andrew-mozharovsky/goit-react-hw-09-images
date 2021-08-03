import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";

import imageAPI from "./services/services";
import ImageGallery from "./Components/ImageGallery";
import ImageGalleryItem from "./Components/ImageGalleryItem";
import LoadMore from "./Components/LoadMore";
import Searchbar from "./Components/Searchbar";
import Modal from "./Components/Modal";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState("");
  const [alt, setAlt] = useState("");

  useEffect(() => {
    if (searchQuery === "") {
      return;
    }
    const fetchImages = () => {
      setLoading(true);

      const options = {
        searchQuery,
        page,
      };

      imageAPI
        .fetchImage(options)
        .then(({ hits }) => setImages((prevImages) => [...prevImages, ...hits]))
        .finally(setLoading(false));
    };

    fetchImages();
  }, [searchQuery, page]);

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  });

  const onChangeQuery = (query) => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
  };

  const toggleModal = () => {
    setShowModal((prevVal) => !prevVal);
  };

  const getLargeImage = (e) => {
    setLargeImage(e.target.dataset.largeurl);
    setAlt(e.target.alt);
  };

  const LoadMoreButton = images.length > 0;

  const showMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={"container"}>
      <Searchbar onSubmit={onChangeQuery} />
      <ImageGallery imageClick={getLargeImage}>
        <ImageGalleryItem onClick={toggleModal} imageArr={images} />
      </ImageGallery>
      {loading && (
        <Loader
          className={"spinier"}
          type="Oval"
          color="#00BFFF"
          height={50}
          width={50}
        />
      )}

      {LoadMoreButton && !loading && <LoadMore onChange={showMore} />}
      {showModal && (
        <Modal largeImage={largeImage} alt={alt} closeModal={toggleModal} />
      )}
    </div>
  );
};

export default App;
