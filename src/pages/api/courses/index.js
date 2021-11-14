//a GET api endpoint that returns a list of courses present in the film data

import nc from "next-connect";
import { getAllCourses } from "../../../lib/backend-utils";

const handler = nc().get(async (req, res) => {
  const allCourses = await getAllCourses();
  res.status(200).json(allCourses);

});

export default handler;