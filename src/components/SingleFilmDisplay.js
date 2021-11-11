/***** 
 * Props
 * Title, Overview, Poster Path, Directors, Actors, Video, Release Date, Contributors 
 * 

******/

import styles from "../styles/SingleFilmDisplay.module.scss";



export default function SingleFilmDisplay({ film }) {

    //quick return if undefined film
    if (!film) {
        return (
            <p>Choose a Film!</p>
        );
    }

    const directors = film.directors.map((director) => <li key={director}>{director}</li>);
    const actors = film.actors.map((actor) => <li key={actor}>{actor}</li>);
    const contributors = film.contributors.map((contrib) => <li key={contrib}>{contrib}</li>);


    return (
        <div className={styles.background}>
            <div className={styles.content}>
                <div className={styles.text}>
                    <div className={styles.titleContainer}>
                        <h3 className={styles.title}>
                            <strong>{film.title}</strong>
                        </h3>
                        <h3 className={styles.date}>Release Date: {film.release_date}</h3>
                    </div>
                    <div className={styles.filmContainer}>
                        <iframe className={styles.film} src="https://player.vimeo.com/video/644532680?h=89746a8c96&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="1158" height="720" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title="Sample Video for Website"/>
                    </div>
                    <div className={styles.overviewContainer}>
                        <h3>OVERVIEW</h3>
                        <div className={styles.overview}>
                            <p>{film.overview}</p>
                        </div>
                    </div>
                    <div className={styles.contributorsContainer}>
                        <div className={styles.directors}>
                            <h3>Directors</h3>
                            <ul>
                                {directors}
                            </ul>
                        </div>
                        <div className={styles.actors}>
                            <h3>Actors</h3>
                            <ul>
                                {actors}
                            </ul>
                        </div>
                        <div className={styles.contributors}>
                            <h3>Contributors</h3>
                            <ul>
                                {contributors}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}