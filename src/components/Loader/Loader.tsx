import React, { FC } from "react";
import { ClipLoader } from "react-spinners";
import styles from "./Loader.module.css";

const Loader: FC = () => (
  <div className={styles.loader}>
    <ClipLoader size={80} />
  </div>
);

export default Loader;
