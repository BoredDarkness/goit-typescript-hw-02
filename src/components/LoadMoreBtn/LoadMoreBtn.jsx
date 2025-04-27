import React from "react";
import styles from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onClick }) {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={onClick}>
        Load more
      </button>
    </div>
  );
}
