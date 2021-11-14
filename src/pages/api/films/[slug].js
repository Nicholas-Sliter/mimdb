import nc from "next-connect";
import { getFilmBySlug } from "../../../lib/backend-utils";

const handler = nc().get(async (req, res) => {
  const { slug } = req.query;
  const film = await getFilmBySlug(slug);
  if (film) {
    res.status(200).json(film);
  } else {
    res.status(404);
  }
});
export default handler;

