import nc from "next-connect";
import { readData } from "../../../lib/backend-utils";


// Filtering films
const handler = nc().get((req, res) => {
  const films = readData();

  const filters = req.query;

  const result = films.filter((film) => {
    let match = false;
    Object.entries(filters).forEach(([filter, value]) => {
      if (film[filter]) {
        match = Array.isArray(film[filter]) ? film[filter].includes(value) : film[filter]===value;
      }
    });
    return match;
  });

  res.status(200).json(result);
});
export default handler;

