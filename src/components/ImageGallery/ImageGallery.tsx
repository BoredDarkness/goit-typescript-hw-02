import React, { FC } from "react";
import { Photo } from "../../services/api";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

interface Props {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}

const ImageGallery: FC<Props> = ({ photos, onPhotoClick }) => (
  <ul className={styles.gallery}>
    {photos.map((img) => (
      <ImageCard key={img.id} image={img} onClick={onPhotoClick} />
    ))}
  </ul>
);

export default ImageGallery;
