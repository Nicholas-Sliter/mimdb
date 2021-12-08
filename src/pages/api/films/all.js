import nc from "next-connect";
import { getAllFilms } from "../../../lib/backend-utils";
import { validateFilterTerm } from "../../../lib/backend-utils";

// Get all films including the unapproved ones
const handler = nc().get(async (req, res) => {
  const allFilms

  res.status(200).json(await getAllFilms());

  
    res.status(500).json({
      error: "Could not retrieve films",
    });

});
export default handler;

