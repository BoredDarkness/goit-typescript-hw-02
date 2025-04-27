import React, { FC, useEffect } from "react";
import { createPortal } from "react-dom";
import { Photo } from "../../services/api";
import styles from "./ImageModal.module.css";

const modalRoot = document.getElementById("modal-root")!;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  photo: Photo;
}

const ImageModal: FC<Props> = ({ photo, onClose }) => {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) onClose();
  };

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <img
          src={photo.urls.regular}
          alt={photo.description || "Large view"}
          className={styles.image}
        />
      </div>
    </div>,
    modalRoot
  );
};

export default ImageModal;
