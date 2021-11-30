/***** 
 * Props
 * Title, Overview, Poster Path, Directors, Actors, Video, Release Date, Contributors 
 * 

******/
import styles from "../styles/SingleFilmDisplay.module.scss";
import Link from "next/link";

import ReactPlayer from "react-player/vimeo";

export default function SingleFilmDisplay({ film }) {

  //quick return if undefined film
  if (!film) {
    return <p>Choose a Film!</p>;
  }

    const directors = film.directors.map((director) => {
    return(
        <li key={director}> 
            <Link href={`/directors/${director}`} passHref> 
                {director}
            </Link> 
        </li> 
    )


    });
    
    
  const actors = film.actors.map((actor) => <li key={actor}>{actor}</li>);
  const contributors = film.contributors.map((contrib) => (
    <li key={contrib}>{contrib}</li>
  ));

  console.log(film);

  const course = film.course;
  const backdrop_path = `/filmImages${film.backdrop_path}`;
  const poster_path = `/filmImages${film.poster_path}`;
  const vimeo_url = "https://vimeo.com/607602408"; //`https://vimeo.com/${film.vimeo_id}`;


  return (
    <div className={styles.pageContainer}>
      <div className={styles.background_image_container}>
        <img src={backdrop_path}></img>
        <img src={poster_path} className={styles.poster} />
      </div>
      <div className={styles.content}>
        <h1 className={styles.filmTitle}>{film.title}</h1>
        <span className={styles.term}>Term: {film.term}</span>
        <span className={styles.genre}>{film.genre.join(", ")}</span>
        <span className={styles.duration}>{film.duration}</span>
        <div></div>
        <h4 className={styles.directors}>
          Directed by:
          <ul className={styles.directorsList}>
            {directors}
          </ul>
        </h4>
        <div></div>
        <div className={styles.video}>
          <ReactPlayer
            width="100%"
            height="100%"
            url={vimeo_url}
            controls={true}
          />
        </div>
        <div className={styles.details}>
          <p className={styles.overview}>{film.overview}</p>
        </div>


        <div className={styles.largeColumnC}>
          <div className={styles.courseContainer}>
            <h3>Course</h3>
            <div className={styles.overview}>
              <Link
                href={`/films/course/${encodeURIComponent(course)}`}
                passHref
                key={course}
              >
                <h4 className={styles.courseName}>{course}</h4>
              </Link>
            </div>
          </div>
          <div className={styles.contributorsContainer}>
            <div className={styles.actors}>
              <h3>Actors</h3>
              <ul>{actors}</ul>
            </div>
            <div className={styles.contributors}>
              <h3>Contributors</h3>
              <ul>{contributors}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
