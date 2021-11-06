import nc from "next-connect";
import { readData } from "../../../lib/backend-utils";

const handler = nc().get((req, res) => {
  const films = readData();

  // Code used to generate the mock data with random term and course.
  // This should serve as only reference purpose and should be removed as soon as we migrate to a database.
  /*
  const termArray = ["F21", "S21", "F20"];
  const courseArray = ["Film History", "Sight and Sound", "Film Theory", "Television in the US"];

  const newFilms = films.map((film) => {
    const randomTerm = termArray[Math.floor(Math.random() * termArray.length)];
    const randomCourse = courseArray[Math.floor(Math.random() * courseArray.length)];
    film.term = randomTerm;
    film.course = [randomCourse];
    return film;
  });
  saveData(newFilms);
  res.status(200);
  */
  const filters = req.query;

  const result = films.filter((film) => {
    let match = false;
    Object.entries(filters).forEach(([filter, value]) => {
      if (film[filter]) {
        match = Array.isArray(film[filter]) ? film[filter].includes(value) : film[filter]===value;
      }
    });
    return match;
  });

  res.status(200).json(result);
});
export default handler;

