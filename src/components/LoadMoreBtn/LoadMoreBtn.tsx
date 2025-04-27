import React, { FC } from "react";
import styles from "./LoadMoreBtn.module.css";

interface Props {
  onClick: () => void;
}

const LoadMoreBtn: FC<Props> = ({ onClick }) => (
  <button type="button" className={styles.btn} onClick={onClick}>
    Load More
  </button>
);

export default LoadMoreBtn;
