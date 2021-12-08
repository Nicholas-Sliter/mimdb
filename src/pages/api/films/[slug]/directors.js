import nc from "next-connect";
import { getDirectorSlugByFilmSlug } from "../../../../lib/backend-utils";

const handler = nc().get(async (req, res) => {
  const { slug } = req.query;
  
  const directorSlugs = await getDirectorSlugByFilmSlug(slug);
  
  if (directorSlugs && directorSlugs.length) {
    res.status(200).json(directorSlugs);
  } else {
    res.status(404);
  }
});
export default handler;
