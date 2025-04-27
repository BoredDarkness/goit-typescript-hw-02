import { FC, memo } from "react";
import { Photo } from "../../services/api";
import styles from "./ImageCard.module.css";

interface Props {
  image: Photo;
  onClick: (img: Photo) => void;
}

const ImageCard: FC<Props> = memo(({ image, onClick }) => {
  return (
    <li className={styles.card} onClick={() => onClick(image)}>
      <img
        src={image.urls.small}
        alt={image.description || "Image"}
        className={styles.image}
      />
    </li>
  );
});

export default ImageCard;
