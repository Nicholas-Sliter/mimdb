//a controller component that resolves a query for an array of films and displays them in a film row.
import { useState } from "react";
import FilmRow from "./FilmRow";

//sample queryObj
// {
//    title: "",
//    genre: "",
//    course: ""
// }




export default function FilmController({queryObj, rowStyleObject}) {
   const [films, setFilms] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);
   
   const {displayType, wrap} = rowStyleObject;


   //build a query string from the query object


   const fetchFilms = async () => {
      try {
         const response = await fetch(query);
         const data = await response.json();
         setFilms(data);
         setLoading(false);
      } catch (error) {
         setError(true);
      }
   }

   useEffect(() => {
      fetchFilms();
   }, [query]);
   
   return (
      <FilmRow films={films} displayType={displayType} wrap={wrap} title={queryObj.title} />);

}