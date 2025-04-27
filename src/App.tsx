import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import ReactModal from "react-modal";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

import { fetchPhotos, Photo } from "./services/api";

ReactModal.setAppElement("#root");

const PER_PAGE = 12;

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    if (!query) return;

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const results = await fetchPhotos(query, page);
        setPhotos((prev) => (page === 1 ? results : [...prev, ...results]));
        setTotalPages(page + 1);
      } catch (err: any) {
        setError(err.message ?? "Something went wrong...");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [query, page]);

  const handleSearchSubmit = (searchValue: string) => {
    if (searchValue === query) return;
    setQuery(searchValue);
    setPage(1);
    setPhotos([]);
    setTotalPages(0);
  };

  const handleLoadMore = () => setPage((prev) => prev + 1);
  const handlePhotoClick = (photo: Photo) => setSelectedPhoto(photo);
  const closeModal = () => setSelectedPhoto(null);

  const hasMore = page < totalPages;

  return (
    <div>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearchSubmit} />

      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          {photos.length > 0 && (
            <ImageGallery photos={photos} onPhotoClick={handlePhotoClick} />
          )}
          {isLoading && <Loader />}
          {photos.length > 0 && !isLoading && hasMore && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
        </>
      )}

      {selectedPhoto && (
        <ImageModal
          isOpen={!!selectedPhoto}
          onClose={closeModal}
          photo={selectedPhoto}
        />
      )}
    </div>
  );
};

export default App;
