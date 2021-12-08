//backend api that checks if a slug is already in use, return true if in use, false if not in use

import nc from "next-connect";
import { checkDirectorSlug } from "../../../../lib/backend-utils";

const handler = nc().get(async (req, res) => {
  const { slug } = req.query;

  if (!slug) {
    res.status(400).json({
      error: "No valid director slug given",
    });
    return;
  }

  const result = await checkDirectorSlug(slug);

  if (typeof result !== 'boolean') {
    res.status(500).json({
      error: "Error failed to check if slug is in use",
    });

    return result;
  }

  res.status(200).json(result);
});

export default handler;
