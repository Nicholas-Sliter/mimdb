
import styles from "../styles/NavBar.module.css";
import Category from "./Category";

export default function Header({searchResults, filterResults, genreList, classList}) {

  return (
    <header>
        <div className={styles.navbar}>
            <a className={styles.logo}><img src="/mimdb-logo-full.svg" /></a>
            <div className={styles.filter}>
              <Category fieldName={"Genre"} fieldList={genreList}/>
              <Category fieldName={"FMMC 0XXX"} fieldList={classList}/>
              <a className={styles.serachbar}><input type="text" placeholder="Search.."/></a>
            </div>
        </div> 
    </header>
  );
}
