//a GET api endpoint that returns a list of all genres present in the film database

import nc from "next-connect";
import { getAllGenres } from "../../../lib/backend-utils";

const handler = nc().get(async (req, res) => {
  const allGenres = await getAllGenres();

  if (!allGenres) {
    res.status(500).json({
      error: "Could not retrieve genres"
    });
    return;
  }
  
  res.status(200).json(allGenres);
});

export default handler;
