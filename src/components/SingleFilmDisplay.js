/***** 
 * Props
 * Title, Overview, Poster Path, Directors, Actors, Video, Release Date, Contributors 
 * 

******/

import styles from "../styles/SingleFilmDisplay.module.scss";



export default function SingleFilmDisplay({film}) {

    //quick return if undefined film
    if (!film){
        return(
            <p>Choose a Film!</p>
        );
    }

    const directors = film.directors.map((director)=><li key={director}>{director}</li>);
    const actors = film.actors.map((actor)=><li key={actor}>{actor}</li>);
    const contributors = film.contributors.map((contrib)=><li key={contrib}>{contrib}</li>);


    return(
        <div className={styles.background}>
            <div className={styles.content}>
            <img src={`/filmImages${film.poster_path}`} />
                <div className = {styles.text}>
                        <h3><strong>{film.title}</strong></h3>
                        <hr></hr>
                        <p>{film.overview}</p>
                        <hr></hr>
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