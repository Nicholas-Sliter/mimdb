import nc from "next-connect";
import { getAllDirectors } from "../../../lib/backend-utils";

const handler = nc().get(async (req, res) => {
 
  const directors = await getAllDirectors();

  if (!directors) {
    res.status(500).json({
      error: "Could not retrieve a list of all directors",
    });
    return;
  }

  res.status(200).json(directors);
});

export default handler;
