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
  let id_list = [];
  if (filter === "genre") {
    id_list = await getFilmsByGenre(value);
  } else if (filter === "course") {
    id_list = await getFilmsByCourse(value);
  } else if (filter === "language") {
    id_list = await getFilmsByLanguage(value);
  } else if (filter === "director") {
    id_list = await getFilmsByDirector(value);
  } else if (filter === "actor") {
    id_list = await getFilmsByActor(value);
  } else if (filter === "contributor") {
    id_list = await getFilmsByContributor(value);
  }

  const result = await Promise.all(id_list.map(async (film_id) => await getFilmById(film_id.film_id)));
  res.status(200).json(result);
});
export default handler;

