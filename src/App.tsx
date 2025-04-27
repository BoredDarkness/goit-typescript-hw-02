import React, { useState, useEffect, useCallback } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import ImageModal from "./components/ImageModal/ImageModal";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { fetchImages, Image } from "./services/api";
import "./styles.css";

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Image | null>(null);

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
    setImages([]);
    setPage(1);
  }, []);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setError(null);
    fetchImages(query, page)
      .then((newImgs) => {
        if (newImgs.length === 0) setError("No images found");
        setImages((prev) => [...prev, ...newImgs]);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [query, page]);

  const openModal = (img: Image) => setSelected(img);
  const closeModal = () => setSelected(null);
  const loadMore = () => setPage((p) => p + 1);

  return (
    <div className="app">
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onClick={openModal} />
      {loading && <Loader />}
      {images.length > 0 && !loading && <LoadMoreBtn onClick={loadMore} />}
      {selected && <ImageModal image={selected} onClose={closeModal} />}
    </div>
  );
};

export default App;
