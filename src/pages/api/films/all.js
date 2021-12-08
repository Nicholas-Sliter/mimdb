import nc from "next-connect";
import { getReallyAllFilms } from "../../../lib/backend-utils";

// Get all films including the unapproved ones
const handler = nc().get(async (req, res) => {
  const allFilms = await getReallyAllFilms();
  if (allFilms) {
    res.status(200).json(allFilms);
  } else {
    res.status(500).json({
      error: "Could not retrieve all films",
    });
  }
});
export default handler;

