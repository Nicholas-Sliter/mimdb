import router from "next/router";
import styles from "../styles/SearchBar.module.scss";
import { useState } from "react";
import {FiSearch} from "react-icons/fi";

export default function SearchBar({ placeholder = "Search ..." }) {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  //go to search page on enter
  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      router.push(`/search?keyword=${search}`);
    }
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.searchBar}
        type="text"
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
        onKeyUp={(e) => handleSubmit(e)}
      />
      <FiSearch className={styles.searchIcon} />
    </div>
  );
}
