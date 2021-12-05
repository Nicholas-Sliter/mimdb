import nc from "next-connect";
import { getPosterById } from "../../../lib/backend-utils";

const handler = nc().get(async (req, res) => {
  const { id } = req.query;
  const poster = await getPosterById(id);
  if (poster) {
    res.status(200).json(poster);
  } else {
    res.status(500).json({
      error: "Could not retrieve poster",
    });
    return;
  }

  
});
export default handler;

