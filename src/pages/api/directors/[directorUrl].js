import nc from "next-connect";
import { getDirector } from "../../../lib/backend-utils";

const handler = nc().get(async (req, res) => {
  const { directorUrl } = req.query;

  const director = await getDirector(directorUrl);

  if (!director) {
    res.status(500).json({
      error: "Could not retrieve directors"
    });
    return;
  }
  
  res.status(200).json(director);
});

export default handler;