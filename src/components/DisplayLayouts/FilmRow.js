import SmallCard from "../FilmCards/SmallCard";
import WideCard from "../FilmCards/WideCard";

import styles from "../../styles/DisplayLayouts/FilmRow.module.scss";


export default function FilmRow({
   films,
   title,
   displayType="small",
   wrap=true
}) {

   //get rowStyle from combindation of displayType and wrap
   const rowString = ((displayType === "small") ? "row" : "wideRow") + (wrap ? "" : "_nowrap");
   const rowStyle = styles[rowString];

   const cards = []
   if (displayType === "small") {
      films.forEach(film => {
         cards.push(
           <div className={styles.rowCard} key={film.id} data-testid="smallTestCard">
             <SmallCard film={film} key={film.id} id={film.id} />
           </div>
         );
      })
   }
   else if (displayType === "wide"){
      films.forEach(film => {
         cards.push(
           <div className={styles.rowCard} key={film.id} data-testid="wideTestCard">
             <WideCard film={film} key={film.id} id={film.id} />
           </div>
         );
      })
   }


   return (
      <div className={styles.container}>
         <h2 className={styles.title} data-testid = "title">{title}</h2>
         <div className={rowStyle}>
            {cards}
         </div>
      </div>
   );


}