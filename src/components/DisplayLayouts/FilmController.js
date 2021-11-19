//a controller component that resolves a query for an array of films and displays them in a film row.
import { useState, useEffect } from "react";
import FilmRow from "./FilmRow";
import { buildQuery } from "../../lib/frontend-utils.js";
import useResolveQuery from "../../hooks/useResolveQuery";

//sample queryObj
// {
//    genre: "",
//    course: "",
//    term: ""
// }


export default function FilmController({title, queryObj, rowStyleObject}) {
   const [query, setQuery] = useState("");
   const {displayType, wrap} = rowStyleObject;

   useEffect(() => {
      setQuery(buildQuery(queryObj));
   }, [queryObj])


   return (
      <FilmRow films={useResolveQuery(query)} displayType={displayType} wrap={wrap} title={title} />);

}
