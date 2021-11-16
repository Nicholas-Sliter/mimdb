import nc from "next-connect";
import {
  getFilmsByGenre,
  getFilmsByCourse,
  getFilmsByLanguage,
  getFilmsByDirector,
  getFilmsByActor,
  getFilmsByContributor,
  getFilmById
} from "../../../lib/backend-utils";


// Filtering films
const handler = nc().get(async (req, res) => {

  const filters = req.query;

  const filter = Object.keys(filters)[0];
  const value = filters[filter];

  const func = {
    "genre" : getFilmsByGenre,
    "course" : getFilmsByCourse,
    "director" : getFilmsByDirector,
    "actor" : getFilmsByActor,
    "contributor" : getFilmsByContributor,
  };
  
  // having its format as [{film_id: 3}, {film_id:52}, ...]
  const id_list = await func[filter](value);
  
  const result = await Promise.all(id_list.map(async (film_id) => await getFilmById(film_id.film_id)));
  res.status(200).json(result);
});
export default handler;

