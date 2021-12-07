import nc from "next-connect";
import {
  getFilmsByTerm,
  getFilmsByGenre,
  getFilmsByCourse,
  getFilmsByDirector,
  getFilmsByActor,
  getFilmsByContributor,
  getFilmById,
  getAllFilms
} from "../../../lib/backend-utils";
import { validateFilterTerm } from "../../../lib/backend-utils";

const func = {
  "term" : getFilmsByTerm,
  "genre" : getFilmsByGenre,
  "course" : getFilmsByCourse,
  "director" : getFilmsByDirector,
  "actor" : getFilmsByActor,
  "contributor" : getFilmsByContributor,
};

const filter2field = {
  "term" : "term",
  "genre" : "genre",
  "course" : "course",
  "director" : "directors",
  "actor" : "actors",
  "contributor" : "contributors",
}

/**
 * filter films in the id_list(filtered by the primary filter) by additional filters in the filter list
 * @param {Object[]} film_list - the list of film objects filtered by the primary filter
 * @param {Object} filters - All filters except for the primary one
 * @returns A list of all films filtered by all filters in the giver filter list
 */
const multiFilters = ((film_list, filters) => {
  const result = film_list.filter((film) => {
    let match = true;
    Object.keys(filters).forEach((filter) => {
      const field = filter2field[filter];
      match = Array.isArray(film[field]) ? film[field].includes(filters[filter]) : filters[filter]===film[field];
    });
    return match;
  });
  return result;
})


// Filtering films:
// The first filter in the filter list is the primary filter used to retrieve movies
// from database. Then, the filter list and the films are passed into multiFilters()
// to be filtered by additional filters in the filter list. For performance, when the
// API is called, filters should be sequenced from the most specific to the most specific.
const handler = nc().get(async (req, res) => {

  const filters = req.query;

  if (Object.keys(filters).length===0) {
    // No filters, returning all films.
    res.status(200).json(await getAllFilms());
    return;
  }

  // Validate all filters in the list
  Object.keys(filters).forEach((filter) => {
    if (!validateFilterTerm(filter)) {
      res.status(400).json({
        error: `Invalid filter term: ${filter}`
      });
      return;
    }
  });

  const primary_filter = Object.keys(filters)[0];
  const value = filters[primary_filter];
  
  // having its format as [{film_id: 3}, {film_id:52}, ...]
  // Getting film IDs from the database by the primary filter
  const id_list = await func[primary_filter](value);

  if (!id_list || !Array.isArray(id_list)) {
    res.status(500).json({
      error: "Could not retrieve films",
    });
    return;
  }
  
  // Get all films based on the id_list
  let film_list = await Promise.all(id_list.map(async (film_id) => await getFilmById(film_id.film_id)));

  film_list = film_list.filter((film) => film!=null);

  if (Object.keys(filters).length>1) {
    film_list = multiFilters(film_list, filters);
  }

  res.status(200).json(film_list);
});
export default handler;

