const fs = require("fs");

exports.seed = async function(knex) {
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

  const genreMap = [];
  const languageMap = [];
  const courseMap = [];
  const directorsMap = [];
  const actorsMap = [];
  const contributorsMap = [];

  films.forEach((film) => {
    film.genre.forEach((genre) => {
      genreMap.push({film_id: film.id, genre_name: genre});
    });
    film.language.forEach((lang) => {
      languageMap.push({film_id: film.id, lang_name: lang});
    });
    film.course.forEach((course) => {
      courseMap.push({film_id: film.id, course_name: course});
    });
    film.directors.forEach((name) => {
      directorsMap.push({film_id: film.id, director_name: name});
    });
    film.actors.forEach((name) => {
      actorsMap.push({film_id: film.id, actor_name: name});
    });
    film.contributors.forEach((name) => {
      contributorsMap.push({film_id: film.id, contributor_name: name});
    });
  });

  await knex("Genre").del();
  await knex.batchInsert("Genre", genreMap, 100);

  await knex("Language").del();
  await knex.batchInsert("Language", languageMap, 100);

  await knex("Course").del();
  await knex.batchInsert("Course", courseMap, 100);

  await knex("Directors").del();
  await knex.batchInsert("Directors", directorsMap, 100);

  await knex("Actors").del();
  await knex.batchInsert("Actors", actorsMap, 100);

  await knex("Contributors").del();
  await knex.batchInsert("Contributors", contributorsMap, 100);
};