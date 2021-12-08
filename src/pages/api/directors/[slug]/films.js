//return the films for director with slug

import nc from "next-connect";
import { getFilmObjectsByDirector } from "../../../../lib/backend-utils";

const handler = nc().get(async (req, res) => {
  const { slug } = req.query;

  const films = await getFilmObjectsByDirector(slug);

  if (!films) {
    res.status(404).json({
      error: "No films found for this director",
    });
    return;
  }

  res.status(200).json(films);
});

export default handler;