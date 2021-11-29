import nc from "next-connect";
import { addFilm, getFilmBySlug } from "../../../lib/backend-utils";
import { convertToSlug } from "../../../lib/frontend-utils";

// Validates the inFilm object and add default empty picture paths
// TODO: potentially in the future if we have time, we can develop the validation process into a smart match process.
const validateAndProcessNewFilm = async (inFilm) => {
  try {
    // let processedFilm = {...inFilm, slug: convertToSlug(processedFilm.title)};
    const processedFilm = {
      "overview": inFilm.overview,
      "description": inFilm.description,
      "release_date": inFilm.release_date,
      "title": inFilm.title,
      "vimeo_id": inFilm.vimeo_id,
      "duration": inFilm.duration,
      "slug": convertToSlug(inFilm.title)
    }

    // check slug, increment if duplicates slug
    // let index = 0;
    // Adds "-[index]""
    let index = /-\d+$/.test(processedFilm.title) ? (+processedFilm.title.match(/\d+$/g)[0]) : 0;
    while (await getFilmBySlug(processedFilm.slug)) {
      processedFilm.title = `${inFilm.title} ${(++index).toString()}`;
      // processedFilm.slug = convertToSlug(processedFilm.title);
      processedFilm.slug = convertToSlug(inFilm.title + "-" + (index).toString());
    }
    
    // Add default empty picture paths
    processedFilm.backdrop_path = "/sp_backdrop.jpg";
    processedFilm.poster_path = "/sp_poster.jpg";
    
    // Generate vimeo boolean, simple
    // TODO: remove check against test data mock vimeo_id
    processedFilm.video = processedFilm.vimeo_id && processedFilm.vimeo_id!=="12345678";

    // Directore stuffs later
    return processedFilm;
  }
  catch (error) {
    console.log(error);
    return null;
  }
};


const handler = nc()
  .post(async (req, res) => {
    const newFilm = req.body;

    const processedFilm = await validateAndProcessNewFilm(newFilm);

    if (processedFilm) {
      res.status(200).json(await addFilm(processedFilm));
    } else {
      res.status(500).json({
        error: "New film validation did not pass"
      });
    }
  });

export default handler;
