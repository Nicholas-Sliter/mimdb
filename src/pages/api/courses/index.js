//a GET api endpoint that returns a list of courses present in the film data

import nc from "next-connect";
import { readData } from "../../../lib/backend-utils";


const handler =  nc().get((req, res) => {

   const films = readData();
   const courses = new Set((films.map(film => film.course).flat()));

   res.status(200).json(Array.from(courses));

});

export default handler;