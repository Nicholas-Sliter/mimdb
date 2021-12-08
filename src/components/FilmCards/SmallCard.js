import styles from "../../styles/FilmCards/SmallCard.module.scss";

import Link from "next/link";
import useGetPoster from "../../hooks/useGetPoster";
import { useEffect, useState } from "react";

import { default_grey_svg } from "../../lib/frontend-utils";

//a normlal-sized film card component that displays the film's title, poster, duration, and genres
export default function SmallCard({ film }) {
  const [poster, setPoster] = useState(default_grey_svg);
  const posterRes = useGetPoster(film.slug);

  useEffect(() => {
    setPoster(posterRes ?? default_grey_svg);
  }, [posterRes])
  return (

    <Link href={`/films/${film.slug}`} passHref>
      <div className={styles.card}>
        <div className={styles.card_poster} data-testid="smallPosterTest">
          <img src={poster} alt={film.title} />
        </div>
        <div className={styles.card_info}>
          <h3>{film.title}</h3>
          <span className={styles.duration}>{film.duration}</span>
          <span className={styles.genre}>{(film.genre) ? film.genre.join(", ") : null}</span>
          <p className={styles.description}>{film.description}</p>
        </div>
      </div>
    </Link>
  );
}
