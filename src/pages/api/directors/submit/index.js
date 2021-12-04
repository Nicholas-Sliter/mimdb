import nc from "next-connect";
import { checkDirectorSlug } from "../../../../lib/backend-utils";

const handler = nc().post(async (req, res) => {
  const director = req.body;

  //const director = await getDirector(directorUrl);

  if (!director) {
    res.status(400).json({
      error: "Director not properly included in request body",
    });
    return;
  }


  if (checkDirectorSlug(director.slug)) {

    res.status(403).json({
      error: `Director with slug ${director.slug} already exists`,
    });
    return;

  }

  //process the director




  //return the director as success
  res.status(200).json(director);
});

export default handler;
