import nc from "next-connect";
import {
  getFilmsByGenre,
  getFilmsByCourse,
  getFilmsByDirector,
  getFilmsByActor,
  getFilmsByContributor,
  getFilmById,
  getAllFilms
} from "../../../lib/backend-utils";
import { validateFilterTerm } from "../../../lib/backend-utils";


// Filtering films
const handler = nc().get(async (req, res) => {

  const filters = req.query;

  if (Object.keys(filters).length===0) {
    // No filters, returning all films.
    res.status(200).json(await getAllFilms());
    return;
  }

  const filter = Object.keys(filters)[0];
  const value = filters[filter];

  if (!validateFilterTerm(filter)) {
    res.status(400).json({
      error: `Invalid filter term: ${filter}`
    });
    return;
  }

  const func = {
    "genre" : getFilmsByGenre,
    "course" : getFilmsByCourse,
    "director" : getFilmsByDirector,
    "actor" : getFilmsByActor,
    "contributor" : getFilmsByContributor,
  };
  
  // having its format as [{film_id: 3}, {film_id:52}, ...]
  const id_list = await func[filter](value);

  if (!id_list || !Array.isArray(id_list)) {
    res.status(500).json({
      error: "Could not retrieve films",
    });
    return;
  }
  
  const result = await Promise.all(id_list.map(async (film_id) => await getFilmById(film_id.film_id)));
  res.status(200).json(result);
});
export default handler;

