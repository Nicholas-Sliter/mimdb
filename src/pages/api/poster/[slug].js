import nc from "next-connect";
import { getPosterBySlug } from "../../../lib/backend-utils";

const handler = nc().get(async (req, res) => {
  const { slug } = req.query;
  const poster = await getPosterBySlug(slug);
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

