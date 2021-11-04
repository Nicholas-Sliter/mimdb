
import styles from "../styles/NavBar.module.css";
import Category from "./Category";
import Link from "next/link";


export default function Header({genreList, classList}) {

  return (
    <header>
      <div className={styles.navbar}>
        <Link href="/" passHref>
          <a className={`${styles.logo} noselect`} draggable={false}>
            <img draggable={false} alt="MIMDB" src="/mimdb-logo-full.svg" />
          </a>
        </Link>
        <div className={styles.filter}>
          <Category fieldName={"Genre"} fieldList={genreList} /> 
          <Category fieldName={"Class"} fieldList={classList} />
          <a className={styles.searchbar}>
            <input type="text" placeholder="Search..." />
          </a>
        </div>
      </div>
    </header>
  );
}
