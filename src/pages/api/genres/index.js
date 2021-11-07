//a GET api endpoint that returns a list of genres present in the film data

import nc from "next-connect";
import { readData } from "../../../lib/backend-utils";

const handler = nc().get((req, res) => {
  const films = readData();
  const genres = new Set(films.map((film) => film.genre).flat());

  res.status(200).json(Array.from(genres));
});

export default handler;
