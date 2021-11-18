import nc from "next-connect";
import { addFilm, getFilmBySlug } from "../../../lib/backend-utils";
import { onError } from "../../../lib/middleware";
import { convertToSlug } from "../../../lib/frontend-utils";

// Validates the inFilm object and add default empty picture paths
// TODO: potentially in the future if we have time, we can develop the validation process into a smart match process.
const validateAndProcessNewFilm = async (inFilm) => {
  try {
    let processedFilm = {...inFilm, slug: convertToSlug(processedFilm.title)};

    // check slug, increment if duplicates slug
    let index = 0;
    while (await getFilmBySlug(processedFilm.slug)) {
      processedFilm.title = processedFilm.title + " " + (++index).toString();
      processedFilm.slug = convertToSlug(processedFilm.title);
    }
    
    // Add default empty picture paths
    processedFilm.backdrop_path = "";
    processedFilm.poster_path = "";
    
    // Generate vimeo boolean, simple
    processedFilm.video = processedFilm.vimeo_id && processedFilm.vimeo_id!="12345678";

    // Directore stuffs later
    return processedFilm;
  }
  catch (error) {
    console.log(error);
    return null;
  }
};


const handler = nc({ onError })
  .post(async (req, res) => {
    const newFilm = req.body;

    const processedFilm = await validateAndProcessNewFilm(newFilm);

    if (processedFilm) {
      await addFilm(processedFilm);
      res.status(200).json(processedFilm);
    } else {
      res.status(500).json({
        error: "New film validation did not pass"
      });
    }
  });

export default handler;
