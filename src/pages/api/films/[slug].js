import nc from "next-connect";
import { getFilmBySlug } from "../../../lib/backend-utils";

const handler = nc().get(async (req, res) => {
  const { slug } = req.query;
  const film = await getFilmBySlug(slug);
  console.log("api-slug", slug);
  if (film) {
    res.status(200).json(film);
  } else {
    res.status(404);
  }
  

  /*
  const films = readData();

  const { slug } = req.query;
  res.status(200).json(films.find((film) => film.slug===slug));
  */
});
export default handler;

