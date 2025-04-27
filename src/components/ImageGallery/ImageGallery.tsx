import React, { FC } from "react";
import { Image } from "../../services/api";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

interface Props {
  images: Image[];
  onClick: (img: Image) => void;
}

const ImageGallery: FC<Props> = ({ images, onClick }) => (
  <ul className={styles.gallery}>
    {images.map((img) => (
      <ImageCard key={img.id} image={img} onClick={onClick} />
    ))}
  </ul>
);

export default ImageGallery;
