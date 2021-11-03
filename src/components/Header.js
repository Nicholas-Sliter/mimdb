
import styles from "../styles/NavBar.module.css";


export default function Header({searchResults, filterResults, genreList, classList}) {

  const genres = genreList.map((genre) => <a>{genre}</a>);
  const classes = classList.map((cl) => <a>{cl}</a>);

  return (
    <header>
        <div className={styles.navbar}>
            <a className={styles.logo}><img src="/mimdb-logo-full.svg" /></a>
            <div className={styles.filter}>
                <div className={styles.dropdown}>
                  <div className={styles.filterCrit}>Genres
                      <div className={styles.dropdownContainer}>
                        {genres}
                      </div>
                  </div>
                </div>
                <div className={styles.dropdown}>
                  <div className={styles.filterCrit}>Classes
                      <div className={styles.dropdownContainer}>
                        {classes}
                      </div>
                  </div>
                </div>
                <a className={styles.serachbar}><input type="text" placeholder="Search.."/></a>
            </div>
        </div> 
    </header>
  );
}
