import nc from "next-connect";
import { checkDirectorSlug, processDirector } from "../../../../lib/backend-utils";

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
  const { processedDirector, error } = await processDirector(director);

  if (error) {
    res.status(400).json({
      error: error,
    });

    return;
  }

  //now insert the director into the database
  const insertedDirector = await insertDirector(processedDirector);


  //return the director as success
  res.status(200).json(insertedDirector);
});

export default handler;
