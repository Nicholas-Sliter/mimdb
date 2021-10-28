
import styles from "../styles/NavBar.module.css";


export default function Header() {




  return (
    <header>
        <div className={styles.navbar}>
            <a className={styles.logo}><img src="/mimdb-logo-full.svg" /></a>
            <div className={styles.filter}>
                <a className={styles.filterCrit}>Genres</a>
                <a className={styles.filterCrit}>Courses</a>
                <a className={styles.serachbar}><input type="text" placeholder="Search.."/></a>
            </div>
        </div> 
    </header>
  );
}
