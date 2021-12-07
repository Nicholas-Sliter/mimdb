import nc from "next-connect";
import { getBackdropBySlug } from "../../../../lib/backend-utils";

const handler = nc().get(async (req, res) => {
  const { slug } = req.query;
  const backdrop = await getBackdropBySlug(slug);
  if (backdrop) {
    res.status(200).json(backdrop);
  } else {
    res.status(500).json({
      error: "Could not retrieve backdrop",
    });
    return;
  }

  
});
export default handler;

