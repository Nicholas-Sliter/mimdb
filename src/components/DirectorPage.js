import styles from "../styles/DirectorsPage.module.css"
import FilmRow from "./DisplayLayouts/FilmRow.js"

export default function DirectorPage ({films, directorInfo}) {

    //console.log(directorInfo)

    /*
    directorInfo =
        {
            director_name: "Wayne Wang",
            director_id: 1,
            director_bio: "I'm actually a programmer.",
            director_midd_email: "midd@middlebury.edu",
            director_personal_email: "personal@domain.com",
            director_graduation_year: "2022.5"
        }
    */


    return (
        <div>
            <div className={styles.topBox}>
                <div className={styles.directorInfo}>
                    <h3>{directorInfo.director_name}</h3>
                    <div className={styles.classEmail}>
                        <h4 className={styles.classYear}>{directorInfo.director_graduation_year}</h4>
                        <h4 className={styles.email}>{directorInfo.director_midd_email}</h4>
                        <h4 className={styles.email}>{directorInfo.director_personal_email}</h4>
                    </div>
                </div>
                <div className={styles.bio}>
                    <p className={styles.bioText}>
                        {directorInfo.director_bio}
                    </p>
                </div>
            </div>
            <FilmRow films={films} title={`Films by ${directorInfo.director_name}`} />
            
        </div>
    )
}