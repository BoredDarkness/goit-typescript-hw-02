import React, { FC, useEffect } from "react";
import { createPortal } from "react-dom";
import { Image } from "../../services/api";
import styles from "./ImageModal.module.css";

const modalRoot = document.getElementById("modal-root")!;

interface Props {
  image: Image;
  onClose: () => void;
}

const ImageModal: FC<Props> = ({ image, onClose }) => {
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
        <img src={image.full} alt={image.tags} />
      </div>
    </div>,
    modalRoot
  );
};

export default ImageModal;
