import nc from "next-connect";
import { readData } from "../../../lib/backend-utils";

const handler = nc().get((req, res) => {
  const films = readData();

  const filters = req.query;

  const result = films.filter((film) => {
    let match = true;
    Object.entries(film).forEach(([key, value]) => {
      if (filters[key] && (filters[key] !== value)) {
        match = false;
      }
    });
    return match;
  });

  res.status(200).json(result);
});
export default handler;

