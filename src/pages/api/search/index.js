/*
 * Search API - uses Fuse.js to perform fuzzy search in our films
 * 
 * This api should be accessed through url "/api/search"
 * Search parameters should be provided in the query. e.g. "/api/search?generalTerm=Inception"
 * 
 * Curretnly performing a search on all keys of a film(titles, actors, class ...)
 * given the general search term.
 * 
 * Currently supporting the following parameters:
 * 1. generalTerm: a string of the search term
 * 
 */

import nc from "next-connect";
import { getAllFilms } from "../../../lib/backend-utils";
import Fuse from "fuse.js";

const searchHandler = async (params) => {
  const films = await getAllFilms();
  const searchTerm = params.keyword;

  const options = {
    threshold: 0.3, // range (0, 1), a lower threshold means a more strict search rule
    includeScore: true, // Wheter includes the score Fuse gives to each result.
    keys: Object.keys(films[0]) // Search all fields of a film object
  }
  const fuse = new Fuse(films, options);
  
  const searchResult = fuse.search(searchTerm);
  return searchResult;
}

const handler = nc().get(async (req, res) => {
  const searchParams = req.query;
  res.status(200).json(await searchHandler(searchParams));
});

export default handler;

