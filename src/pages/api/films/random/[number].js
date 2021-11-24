//get and return number random film objects

import nc from "next-connect";
import { getRandFilms } from "../../../../lib/backend-utils";


const handler = nc().get(async (req, res) => {
  const number = req.query.number ?? 1;
  const validNum = Math.ceil(number);

  const films = await getRandFilms(validNum);
  if (films) {
    res.status(200).json(films);
  } else {
    res.status(500);
  }
});
export default handler;

