import nc from "next-connect";
import { readData } from "../../../lib/backend-utils";

const handler = nc().get((req, res) => {
  const films = readData();

  const { id } = req.query;
  res.status(200).json(films.find((film) => film.id===+id));
});
export default handler;

