import nc from "next-connect";
import { getBackdropById } from "../../../lib/backend-utils";

const handler = nc().get(async (req, res) => {
  const { id } = req.query;
  const backdrop = await getBackdropById(id);
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

