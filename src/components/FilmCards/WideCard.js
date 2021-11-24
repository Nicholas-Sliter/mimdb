import styles from "../../styles/FilmCards/WideCard.module.scss";

import Link from "next/link";

//import poster server from enviroment variables
//const POSTER_SERVER = process.env.REACT_APP_POSTER_SERVER;

export default function WideCard({ film }) {
  //for development builds this poster server will be set to the local public folder in next.js
  //const poster_path = (film.poster_path) ? `${POSTER_SERVER}${film.poster_path}` : "#";
  //these are temporary paths until we find a storage solution for images
  const poster_path = `/filmImages${film.poster_path}`;
  const backdrop_path = `/filmImages${film.backdrop_path}`;

  return (
    
    <Link href={`/films/${film.slug}`} passHref>
      <a>
        <div className={styles.card}>
          <div className={styles.infoSection}>
            <div className={styles.movieHeader}>
              <div data-testid="widePosterTest">
                <img
                  className={styles.poster}
                  draggable={false}
                  src={poster_path}
                />
                <h1 className={styles.title}>{film.title}</h1>
                <span className={`${styles.duration} noselect`}>
                  {film.duration}
                </span>
                <p className={styles.genre}>{(film.genre) ? film.genre.join(", ") : null}</p>
                <div className={styles.movieDescription}>
                  <p className={styles.text}>{film.description}</p>
                </div>
              </div>
            </div>
          </div>

          <img className={styles.blurBackground} src={backdrop_path} />
        </div>
      </a>
    </Link>
  );
}
