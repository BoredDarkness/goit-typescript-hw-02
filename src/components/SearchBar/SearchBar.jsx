import React, { useState } from "react";
import toast from "react-hot-toast";

import styles from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchValue.trim() === "") {
      toast.error("Please enter text for search!");
      return;
    }

    onSubmit(searchValue);
    setSearchValue("");
  };

  return (
    <header className={styles.header}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
    </header>
  );
}
