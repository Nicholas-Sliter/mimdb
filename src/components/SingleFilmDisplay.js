/***** 
 * Props
 * Title, Overview, Poster Path, Directors, Actors, Video, Release Date, Contributors 
 * 
 * 
 * 
 * 
******/

import styles from "../styles/SingleFilmDisplay.module.scss";


export default function SingleFilmDisplay() {



    return(
        <div className={styles.background}>
            <div className={styles.head}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>TITLE OF FILM</h1>
                </div>
                <div className={styles.dateContainer}>
                    <a className={styles.date}>11/11/11</a>
                </div>
                <div className={styles.authorContainer}>
                    <a className={styles.author}>Christopher Andrews</a>
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.filmContainer}>
                    <img className={styles.video} src="/mimdb-logo-full.svg"/>
                </div>
                <div className={styles.overview}>
                    <p className={styles.overviewText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div className={styles.contributorsContainer}>
                    <div className={styles.directors}>
                        <ul>
                            <li>Wes Anderson</li>
                        </ul>
                    </div>
                    <div className={styles.actors}>
                        <ul>
                            <li>Matt Damon</li>
                            <li>Jessica Chastain</li>
                            <li>Charlie Day</li>
                        </ul>
                    </div>
                    <div className={styles.contributors}>
                        <ul>
                            <li>helper 1</li>
                            <li>helper 2</li>
                            <li>helper 3</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>



    )




}