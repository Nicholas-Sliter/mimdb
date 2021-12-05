//a controller component that resolves a query for an array of films and displays them in a film row.
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
   const {displayType, wrap} = rowStyleObject;

   const query = buildQuery(queryObj);

   return (
      <FilmRow films={useResolveQuery(query)} displayType={displayType} wrap={wrap} title={title} />);

}
