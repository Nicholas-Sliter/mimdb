
import styles from "../styles/NavBar.module.css";


export default function Header(searchResults, filterResults) {






  return (
    <header>
        <div className={styles.navbar}>
            <a className={styles.logo}><img src="/mimdb-logo-full.svg" /></a>
            <div className={styles.filter}>
                <div className={styles.dropdown}>
                  <div className={styles.filterCrit}>Genres
                      <div className={styles.dropdownContainer}>
                        <a onClick>Fantasy</a>
                        <a>Sci-Fi</a>
                        <a>Documentary</a>
                      </div>
                  </div>
                </div>
                <div className={styles.dropdown}>
                  <div className={styles.filterCrit}>Classes
                      <div className={styles.dropdownContainer}>
                        <a>Sight and Sound</a>
                        <a>Documentary</a>
                        <a>Film101</a>
                      </div>
                  </div>
                </div>
                <a className={styles.serachbar}><input type="text" placeholder="Search.."/></a>
            </div>
        </div> 
    </header>
  );
}
