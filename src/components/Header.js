
import styles from "../styles/NavBar.module.css";
import Category from "./Category";

export default function Header({genreList, classList}) {

  return (
    <header>
        <div className={styles.navbar}>
            <a className={styles.logo}> <img src="/mimdb-logo-full.svg" /></a>
            <div className={styles.filter}>
              <Category fieldName={"Genre"} fieldList={genreList}/>
              <Category fieldName={"Class"} fieldList={classList}/>
              <a className={styles.searchbar}><input type="text" placeholder="Search.."/></a>
            </div>
        </div> 
    </header>
  );
}
