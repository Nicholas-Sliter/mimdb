/*
Category.js

Display a category of drop down menu that is used in Header.js
*/
import Link from "next/link";

import styles from "../styles/NavBar.module.css";
import { FiChevronDown } from "react-icons/fi";

export default function Category({ fieldName, fieldList }) {
  let uniqueFields = "";
  if (fieldList === undefined) {
    uniqueFields = <a />;
  } else {
    uniqueFields = fieldList.map((field) => (
      <Link href="/search/" passHref key={field}>
        <a data-testid="dropdown">
          {field}
        </a>
      </Link>
    ));
  }

  return (
    <div className={styles.dropdown}>
      <div className={`${styles.filterCrit} noselect`}>
        <span>
          <b>{fieldName}</b> <FiChevronDown className={styles.icon} />
        </span>
        <div className={styles.dropdownContainer}>{uniqueFields}</div>
      </div>
    </div>
  );
}
