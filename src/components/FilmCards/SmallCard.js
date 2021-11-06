import styles from "../../styles/FilmCards/SmallCard.module.scss";

import Link from "next/link";

//const POSTER_SERVER = "#";

//a normlal-sized film card component that displays the film's title, poster, duration, and genres
export default function SmallCard({ film }) {
  //for development builds this poster server will be set to the local public folder in next.js
  //const poster_path = (filmObj.poster_path) ? `${POSTER_SERVER}${filmObj.poster_path}` : "#";
  const poster_path = `/filmImages${film.poster_path}`//"/sp.jpg";
  return (
    <Link href={`/films/${film.slug}`} passHref>
      <a>
        <div className={styles.card}>
          <div className={styles.card_poster}>
            <img src={poster_path} alt={film.title} />
          </div>
          <div className={styles.card_info}>
            <h3>{film.title}</h3>
            <span className={styles.duration}>{film.duration}</span>
            <span className={styles.genre}>{film.genre.join(", ")}</span>
            <p className={styles.description}>{film.description}</p>
          </div>
        </div>
      </a>
    </Link>
  );
}
