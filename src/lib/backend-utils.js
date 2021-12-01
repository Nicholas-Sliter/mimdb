/**
 * Backend utility functions
 * 
 * Borrowed from Practicle7. This practice of using a golden copy of .json will be replaced later by database.
 * 
 * The assumption is that the working data store is found in data/films.json and we have a "golden copy" in data/mockData.json.
 */

//import fs from "fs";
//import path from "path";
import process from "process";

import knexConfig from "../../knexfile";
import knexInitializer from "knex";

export const knex = knexInitializer(
  knexConfig[process.env.NODE_ENV || "development"]
);

// export function resetData() {
//   const dataDirectory = path.join(process.cwd(), "data");
//   const orig = path.join(dataDirectory, "data.json");
//   const dest = path.join(dataDirectory, "tempData.json");
//   fs.copyFileSync(orig, dest);
// }


export function readData() {
  const dataDirectory = path.join(process.cwd(), "data");
  const fullPath = path.join(dataDirectory, "tempData.json");
  if (!fs.existsSync(fullPath)) {
    resetData();
  }
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const films = JSON.parse(fileContents);

  return films;
}

export function saveData(films) {
  const dataDirectory = path.join(process.cwd(), "data");
  const fullPath = path.join(dataDirectory, "tempData.json");
  if (!fs.existsSync(fullPath)) {
    resetData();
  }
  fs.writeFileSync(fullPath, JSON.stringify(films, null, "\t"), "utf8"); // Pretty write the mock data
}



/**
 * Get the list of genre names for a film.
 * 
 * @param {integer} id 
 * @returns an array of genre names for film with id id
 */
export async function getGenres(id) {
  const genres = await knex.select("genre_name")
    .from("Genre")
    .where({ "film_id": id });
  return genres.map((entry) => entry.genre_name);
}

/**
 * Get the list of course names for a film.
 * 
 * @param {integer} id 
 * @returns an array of course names for film with id id
 */
export async function getCourse(id) {
  const courses = await knex.select("course_name")
    .from("CourseFilm")
    .join("Course", "Course.course_number", "CourseFilm.course_number")
    .where({ "film_id": id });
  return courses.map((entry) => entry.course_name);
}

/**
 * Get the list of director names for a film.
 * 
 * @param {integer} id 
 * @returns an array of director names for film with id id
 */
export async function getDirectors(id) {
  const directors = await knex.select("director_name")
    .from("DirectorsFilm")
    .join("Directors", "Directors.director_id", "DirectorsFilm.director_id")
    .where({ "film_id": id });
  return directors.map((entry) => entry.director_name);
}

/**
 * Get the list of actor names for a film.
 * 
 * @param {integer} id 
 * @returns an array of actor names for film with id id
 */
export async function getActors(id) {
  const actors = await knex.select("actor_name")
    .from("Actors")
    .where({ "film_id": id });
  return actors.map((entry) => entry.actor_name);
}

/**
 * Get the list of contributor names for a film.
 * 
 * @param {integer} id 
 * @returns an array of contributor names for film with id id
 */
export async function getContributors(id) {
  const contributors = await knex.select("contributor_name")
    .from("Contributors")
    .where({ "film_id": id });
  return contributors.map((entry) => entry.contributor_name);
}

/**
 * Get the list of the names of all genres present in the database
 * 
 * @returns an array of all genre names for all films in the database
 */
export async function getAllGenres() {
  const allGenreEntries = await knex.select()
    .from("Genre");
  const allGenreNames = new Set(allGenreEntries.map((entry) => entry.genre_name).flat());
  return Array.from(allGenreNames);
}

/**
 * Get the list of the names of all courses present in the database
 * 
 * @returns an array of all course names for all films in the database
 */
export async function getAllCourses() {
  const allCourseEntries = await knex.select("course_name")
    .from("Course");
  return allCourseEntries.map((entry) => entry.course_name);
}

/**
 * An internal helper function that fills a film object 
 * with genre, course, directors, actors, and contributors information.
 * 
 * @param {Object} film
 * @returns an film object with new fields added
 */
async function fillFilm(film) {
  return {
    ...film,
    genre: await getGenres(film.id),
    course: await getCourse(film.id),
    directors: await getDirectors(film.id),
    actors: await getActors(film.id),
    contributors: await getContributors(film.id),
  };
}

/**
 * Get all of the films from the database
 * 
 * @returns an array of all films
 */
export async function getAllFilms() {
  let films = await knex("Film").select();
  return await Promise.all(films.map(async (film) => await fillFilm(film)));
}

/**
 * Get a single film from the database by its id
 * 
 * @param {integer} id 
 * @returns the film associated with id id
 */
export async function getFilmById(id) {
  const [film] = await knex("Film").select().where({ id: id });
  return film ? await fillFilm(film) : null;
}

/**
 * Get a single film from the database by its slug
 * 
 * @param {string} slug 
 * @returns the film associated with slug
 */
export async function getFilmBySlug(slug) {
  const [film] = await knex("Film").select().where({ slug: slug });
  return film ? await fillFilm(film) : null;
}

/**
 * Get the list of films of the given term
 * 
 * @returns an array of all films of the term
 */
 export async function getFilmsByTerm(term) {
  const ids = await knex.select("id")
    .from("Film")
    .where({ "term": term });
  
  // Convert to compatible format with other backend-util GET functions.
  const film_ids = ids.map((obj) => {
    Object.defineProperty(obj, "film_id", Object.getOwnPropertyDescriptor(obj, "id"));
    delete obj["id"];
    return obj;
  });
  return film_ids;
}

/**
 * Get the list of films of the given genre 
 * 
 * @returns an array of all films of the genre
 */
export async function getFilmsByGenre(genre) {
  const film_ids = await knex.select("film_id")
    .from("Genre")
    .where({ "genre_name": genre });
  return film_ids;
}

/**
 * Get the list of films of the given course
 * 
 * @returns an array of all films in the course
 */
export async function getFilmsByCourse(course) {
  const film_ids = await knex.select("film_id")
    .from("CourseFilm")
    .join("Course", "Course.course_number", "CourseFilm.course_number")
    .where({ "course_name": course });
  return film_ids;
}

/**
 * Get the list of films by the given director
 * 
 * @returns an array of all films by the director
 */
export async function getFilmsByDirector(name) {
  const film_ids = await knex.select("film_id")
    .from("DirectorsFilm")
    .join("Directors", "Directors.director_id", "DirectorsFilm.director_id")
    .where({ "director_name": name });
  return film_ids;
}

/**
 * Get the list of films by the given actor
 * 
 * @returns an array of all films by the actor
 */
export async function getFilmsByActor(name) {
  const film_ids = await knex.select("film_id")
    .from("Actors")
    .where({ "actor_name": name });
  return film_ids;
}

/**
 * Get the list of films by the given contributor
 * 
 * @returns an array of all films by the contributor
 */
export async function getFilmsByContributor(name) {
  const film_ids = await knex.select("film_id")
    .from("Contributors")
    .where({ "contributor_name": name });
  return film_ids;
}

/** Get  course by courseName
 * 
 * @returns an array of course info
 * 
 */
export async function getCourseByCourseName(name) {
  const wholeCourse = await knex.select()
    .from("Course").where({"course_name": name})
  return wholeCourse;
}


export function validateFilterTerm(filterTerm) {
  const filters = ["genre","course","director","actor","contributor", "term"];
  return filters.includes(filterTerm);
}


/**
 * Add the validated [film] into the film database
 * TODO: currently DOES NOT ADD to linked databases
 * @returns the inserted new film object.
 */
export async function addFilm(film) {
  const newIDs = await knex("Film").insert(film);
  return await getFilmById(newIDs[0]);
}

/** Get director by directorName
 * 
 * @returns director object
 * 
 */
export async function getDirector(name) {
  const director = await knex("Directors").select().where({director_name: name});
  //need to decide what to actually send!!!!!  TODO!!!!!!!
  return director;

}

