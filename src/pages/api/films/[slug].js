import nc from "next-connect";
import { readData } from "../../../lib/backend-utils";

const handler = nc().get((req, res) => {
  const films = readData();

  const { slug } = req.query;
  res.status(200).json(films.find((film) => film.slug===slug));
});
export default handler;

