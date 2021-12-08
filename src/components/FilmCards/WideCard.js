import styles from "../../styles/FilmCards/WideCard.module.scss";

import Link from "next/link";
import { useEffect, useState } from "react";
import useGetBackdrop from "../../hooks/useGetBackdrop";
import useGetPoster from "../../hooks/useGetPoster";

import { default_grey_svg } from "../../lib/frontend-utils";

//import poster server from enviroment variables
//const POSTER_SERVER = process.env.REACT_APP_POSTER_SERVER;

export default function WideCard({ film }) {
  //for development builds this poster server will be set to the local public folder in next.js
  //const poster_path = (film.poster_path) ? `${POSTER_SERVER}${film.poster_path}` : "#";
  //these are temporary paths until we find a storage solution for images
  
  
  // const {poster_path} = film;
  // const {backdrop_path} = film;

  const [poster, setPoster] = useState(default_grey_svg);
  const [backdrop, setBackdrop] = useState(default_grey_svg);
  const posterRes = useGetPoster(film.slug);
  const backdropRes = useGetBackdrop(film.slug);


  useEffect(() => {
    setPoster(posterRes ?? default_grey_svg);
    setBackdrop(backdropRes ?? default_grey_svg);
  }, [posterRes, backdropRes]);

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
                  src={poster}
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

          <img className={styles.blurBackground} src={backdrop} />
        </div>
      </a>
    </Link>
  );
}
