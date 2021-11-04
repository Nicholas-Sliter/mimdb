import SmallCard from "../FilmCards/SmallCard";

import styles from "../../styles/DisplayLayouts/FilmRow.module.scss";


export default function FilmRow({
   films,
   title,
}) {

   return (
      <div className={styles.container}>
         <h2 className={styles.title}>{title}</h2>
         <div className={styles.row}>
            {films.map(film => (
               <div className={styles.rowCard} key={film.id}><SmallCard key={film.id} film={film} /></div>
            ))}
         </div>
      </div>
   );


}