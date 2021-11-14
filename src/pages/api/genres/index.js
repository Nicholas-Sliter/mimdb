//a GET api endpoint that returns a list of all genres present in the film database

import nc from "next-connect";
import { getAllGenres } from "../../../lib/backend-utils";

const handler = nc().get(async (req, res) => {
  const allGenres = await getAllGenres();
  res.status(200).json(allGenres);
});

export default handler;
