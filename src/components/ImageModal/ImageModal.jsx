import React from "react";
import ReactModal from "react-modal";
import styles from "./ImageModal.module.css";

export default function ImageModal({ isOpen, onRequestClose, image }) {
  if (!image) return null;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <img
        src={image.urls.regular}
        alt={image.alt_description || "Large view"}
        className={styles.image}
      />
    </ReactModal>
  );
}
