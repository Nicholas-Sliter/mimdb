//a GET api endpoint that returns a list of all genres present in the film database

import nc from "next-connect";
import { readData, getAllGenres } from "../../../lib/backend-utils";

const handler = nc().get(async (req, res) => {

  const allGenres = await getAllGenres();
  //console.log(allGenres);
  res.status(200).json(allGenres);
  /*
  const films = readData();
  const genres = new Set(films.map((film) => film.genre).flat());

  res.status(200).json(Array.from(genres));
  */
});

export default handler;
