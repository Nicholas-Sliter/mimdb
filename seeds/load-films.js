const fs = require("fs");

exports.seed = async function(knex) {
  // Loading database "Film"
  const filmContents = fs.readFileSync("./data/tempData.json");
  const films = JSON.parse(filmContents);
  const processedFilms = films.map((film) => {
    return (({ 
        title,
        id,
        slug,
        overview,
        description,
        poster_path,
        release_date,
        video,
        vimeo_id,
        duration
      }) => ({ 
        title,
        id,
        slug,
        overview,
        description,
        poster_path,
        release_date,
        video,
        vimeo_id,
        duration }))(film);
  });
  await knex("Film").del();
  await knex.batchInsert("Film", processedFilms, 100);

  // Loading database "Course", "Directors"
  const courseContents = fs.readFileSync("./data/tempCourses.json");
  const courses = JSON.parse(courseContents);
  await knex("Course").del();
  await knex.batchInsert("Course", courses, 100);

  const directorContents = fs.readFileSync("./data/tempDirectors.json");
  const directors = JSON.parse(courseContents);
  await knex("Directors").del();
  await knex.batchInsert("Directors", directors, 100);

  // Loading databse "Genre", "Actors", "Contributors", "CourseFilm"(affiliation), "DirectorFilm"(affiliation)
  const genreMap = [];
  const actorsMap = [];
  const contributorsMap = [];
  const courseMap = [];
  const directorsMap = [];

  films.forEach((film) => {
    film.genre.forEach((genre) => {
      genreMap.push({film_id: film.id, genre_name: genre});
    });
    film.actors.forEach((name) => {
      actorsMap.push({film_id: film.id, actor_name: name});
    });
    film.contributors.forEach((name) => {
      contributorsMap.push({film_id: film.id, contributor_name: name});
    });
    film.course.forEach((course) => {
      courseMap.push({film_id: film.id, course_name: course});
    });
    film.director_ids.forEach((id) => {
      directorsMap.push({film_id: film.id, director_id: id});
    });
  });

  await knex("Genre").del();
  await knex.batchInsert("Genre", genreMap, 100);

  await knex("Actors").del();
  await knex.batchInsert("Actors", actorsMap, 100);

  await knex("Contributors").del();
  await knex.batchInsert("Contributors", contributorsMap, 100);

  await knex("CourseFilm").del();
  await knex.batchInsert("CourseFilm", courseMap, 100);

  await knex("DirectorFilm").del();
  await knex.batchInsert("Directors", directorsMap, 100);
};