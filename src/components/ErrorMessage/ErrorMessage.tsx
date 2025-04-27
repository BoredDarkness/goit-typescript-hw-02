import React, { FC } from "react";
import styles from "./ErrorMessage.module.css";

interface Props {
  message: string;
}
const ErrorMessage: FC<Props> = ({ message }) => (
  <p className={styles.error}>{message}</p>
);

export default ErrorMessage;
