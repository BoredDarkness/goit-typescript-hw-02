import React, { FC, MouseEvent } from "react";
import { Image } from "../../services/api";
import styles from "./ImageCard.module.css";

interface Props {
  image: Image;
  onClick: (img: Image) => void;
}

const ImageCard: FC<Props> = ({ image, onClick }) => {
  const handleClick = () => onClick(image);
  return (
    <li className={styles.card} onClick={handleClick}>
      <img src={image.thumbnail} alt={image.tags} className={styles.img} />
    </li>
  );
};

export default ImageCard;
