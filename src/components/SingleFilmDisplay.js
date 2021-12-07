/***** 
 * Props
 * Title, Overview, Poster Path, Directors, Actors, Video, Release Date, Contributors 
 * 

******/
import styles from "../styles/SingleFilmDisplay.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import useGetPoster from "../hooks/useGetPoster";
import useGetBackdrop from "../hooks/useGetBackdrop";

import ReactPlayer from "react-player/vimeo";


export default function SingleFilmDisplay({ film }) {
  

  const [poster, setPoster] = useState("");
  const [backdrop, setBackdrop] = useState("");
  const posterRes = useGetPoster(film ? film.slug : "temp"); // temp is for placeholder when loading
  const backdropRes = useGetBackdrop(film ? film.slug : "temp");

  useEffect(() => {
    setPoster(posterRes ?? "");
    setBackdrop(backdropRes ?? "");
  }, [posterRes, backdropRes])

  //quick return if undefined film
  if (!film) {
    return <p>Choose a Film!</p>;
  }

  const directors = film.directors.map((director) => {
    return (
      <li key={director}>
        <Link href={`/directors/${director}`} passHref>
          <a>{director}</a>
        </Link>
      </li>
    )
  });
  const actors = film.actors.map((actor) => <li key={actor}>{actor}</li>);
  const contributors = film.contributors.map((contrib) => (
    <li key={contrib}>{contrib}</li>
  ));
  const { course } = film;
  const vimeo_url = `https://vimeo.com/${film.vimeo_id}`;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.background_image_container}>
        <img src={`data:image/jpg;base64,${backdrop}`} />
        <img src={`data:image/jpg;base64,${poster}`} className={styles.poster} />
      </div>
      <div className={styles.content}>
        <h1 className={styles.filmTitle}>{film.title}</h1>
        <span className={styles.course}>Course: 
          <Link
            href={`/films/course/${encodeURIComponent(course)}`}
            passHref
            key={course}
            >
              <p> {course}</p>
          </Link> 
        </span>
        <span className={styles.term}>Term: {film.term}</span>
        <span className={styles.genre}>{film.genre.join(", ")}</span>
        <span className={styles.duration}>{film.duration}</span>
        <div />
        <h4 className={styles.directors}>
          Directed by:
          <ul className={styles.directorsList}>
            {directors}
          </ul>
        </h4>
        <div />
        <div className={styles.video}>
          <ReactPlayer
            width="100%"
            height="100%"
            url={vimeo_url}
            controls
          />
        </div>
        <div className={styles.details}>
          <p className={styles.overview}>{film.overview}</p>
        </div>


        <div className={styles.largeColumnC}>
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
