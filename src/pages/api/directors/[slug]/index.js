//backend api to get a director by slug

import nc from "next-connect";
import { getDirectorBySlug } from "../../../../lib/backend-utils";

const handler = nc().get(async (req, res) => {
  const { slug } = req.query;

  const director = await getDirectorBySlug(slug);

  if (!director) {
    res.status(404).json({
      error: `No director with slug ${slug}`,
    });
    return;
  }

  res.status(200).json(director);
});

export default handler;