import styles from "../../styles/FilmCards/SmallCard.module.scss";

import Link from "next/link";
import useGetPoster from "../../hooks/useGetPoster";
import { useEffect, useState } from "react";

//a normlal-sized film card component that displays the film's title, poster, duration, and genres
export default function SmallCard({ film }) {
  const [poster, setPoster] = useState("");
  const posterRes = useGetPoster(film.slug);

  useEffect(() => {
    setPoster(posterRes ?? "");
  }, [posterRes])

  return (

    <Link href={`/films/${film.slug}`} passHref>
      <div className={styles.card}>
        <div className={styles.card_poster} data-testid="smallPosterTest">
          <img src={`data:image/jpg;base64,${poster}`} alt={film.title} />
        </div>
        <div className={styles.card_info}>
          <h3>{film.title}</h3>
          <span className={styles.duration}>{film.duration}</span>
          <span className={styles.genre}>{film.genre.join(", ")}</span>
          <p className={styles.description}>{film.description}</p>
        </div>
      </div>
    </Link>
  );
}
