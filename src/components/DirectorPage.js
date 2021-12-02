import styles from "../styles/DirectorsPage.module.scss"
import FilmRow from "./DisplayLayouts/FilmRow.js"

export default function DirectorPage({ films, director }) {

    const directorInfo = director;

    return (
        <div>
            <div className={styles.topBox}>
                <div className={styles.directorInfo}>
                    <h1 data-testid="directorPageName">{directorInfo.director_name}</h1>
                    <div className={styles.classEmail}>
                        <h4 className={styles.classYear} data-testid="directorClassYearShown">{directorInfo.director_graduation_year}</h4>
                        <h4 className={styles.email} data-testid="directorMiddEmail">{directorInfo.director_midd_email}</h4>
                        <h4 className={styles.email} data-testid="directorPerseEmail">{directorInfo.director_personal_email}</h4>

                    </div>
                </div>
                <div className={styles.bio}>
                    <h3 >Biography</h3>
                    <p className={styles.bioText} data-testid="directorBio">
                        {directorInfo.director_bio}
                    </p>
                </div>
            </div>
            <div className={styles.filmRowCont}>

                {(films !== undefined) ? <FilmRow films={films} title={`Films by ${directorInfo.director_name}`} />
                : 
                <p>This Director Does not Have Films</p>
                }     

            </div>
        </div>
    )
}

