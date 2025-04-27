import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import ReactModal from "react-modal";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

ReactModal.setAppElement("#root");

const ACCESS_KEY = "kZt3B-JJhRTnGAAid1ALP1CjftogQ-sa63nBeDkcWEg";

export default function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  const fetchImages = async (searchQuery, currentPage) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: searchQuery,
            page: currentPage,
            per_page: 12,
            client_id: ACCESS_KEY,
          },
        }
      );
      if (currentPage === 1) {
        setImages(response.data.results);
      } else {
        setImages((prev) => [...prev, ...response.data.results]);
      }
      setTotalPages(Math.ceil(response.data.total / 12));
    } catch (err) {
      setError(err.message || "Something goes wrong...");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (searchValue) => {
    setQuery(searchValue);
    setPage(1);
  };

  useEffect(() => {
    if (!query) return;
    fetchImages(query, page);
  }, [query, page]);

  const handleLoadMore = () => setPage((prev) => prev + 1);

  const handleImageClick = (imageData) => setSelectedImage(imageData);

  const closeModal = () => setSelectedImage(null);

  const hasMore = page < totalPages;

  return (
    <div>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearchSubmit} />

      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          {images.length > 0 && (
            <ImageGallery images={images} onImageClick={handleImageClick} />
          )}
          {isLoading && <Loader />}
          {images.length > 0 && !isLoading && hasMore && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
        </>
      )}

      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onRequestClose={closeModal}
          image={selectedImage}
        />
      )}
    </div>
  );
}
