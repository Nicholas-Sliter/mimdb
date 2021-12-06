/**
 * Backend utility functions
 * 
 * Skeleton is from Practical7.
 */

 const fs = require("fs");
import process from "process";

import knexConfig from "../../knexfile";
import knexInitializer from "knex";

export const knex = knexInitializer(
  knexConfig[process.env.NODE_ENV || "development"]
);

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
 * Get the poster of a film.
 * 
 * @param {string} slug 
 * @returns the poster object, in the form of {poster_data:"the base64 string"}
 */
export async function getPosterBySlug(slug) {
  if (slug==='temp') {
    // default poster
    return {poster_data: fs.readFileSync("./public/defaults/salmon-blue.jpg", {encoding: "base64"})}
  }
  const poster = await knex.select("poster_data")
    .from("Poster")
    .where({ "film_slug": slug });
  return poster[0];
}

/**
 * Get the backdrop of a film.
 * 
 * @param {string} slug 
 * @returns the backdrop object, in the form of {backdrop_data:"the base64 string"}
 */
export async function getBackdropBySlug(slug) {
  if (slug==='temp') {
    // default backdrop
    return {backdrop_data: fs.readFileSync("./public/defaults/blue-white.jpg", {encoding: "base64"})}
  }
  const backdrop = await knex.select("backdrop_data")
    .from("Backdrop")
    .where({ "film_slug": slug });
  return backdrop[0];
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
  const films = await knex("Film").select();
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
 * @param {string} term
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
 * @param {string} genre
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
 * @param {string} course
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
 * @param {string} name
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
 * @param {string} name
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
 * @param {string} name
 * @returns an array of all films by the contributor
 */
export async function getFilmsByContributor(name) {
  const film_ids = await knex.select("film_id")
    .from("Contributors")
    .where({ "contributor_name": name });
  return film_ids;
}

/** Get course by courseName
 * 
 * @param {string} name
 * @returns an array of course info
 */
export async function getCourseByCourseName(name) {
  const wholeCourse = await knex.select()
    .from("Course").where({"course_name": name})
  return wholeCourse;
}

/** Get director by directorName
 * 
 * @param {string} name
 * @returns director object
 */
export async function getDirector(name) {
  const director = await knex("Directors").select().where({director_name: name});
  // TODO: need to decide what to actually send!!!!!
  return director;

}


/** Get all director names
 * 
 * @returns an array of all director names
 * 
 */
export async function getAllDirectors() {
  const allDirectors = await knex.select("director_name")
    .from("Directors");
  return allDirectors.map((entry) => entry.director_name);
}


export function validateFilterTerm(filterTerm) {
  const filters = ["genre","course","director","actor","contributor", "term"];
  return filters.includes(filterTerm);
}

/**
 * Add the validated [film] into the Film database
 * @param {Object} film
 * @returns the inserted new film object.
 */
export async function addFilm(film) {
  const newIDs = await knex("Film").insert(film);
  return await getFilmById(newIDs[0]);
}

/**
 * Add the director film relationship into the DirectorsFilm database
 * 
 * @param {string} director_name - The name of the director
 * @param {integer} id - The id of the film
 * @returns the related film object.
 */
export async function addDirectorsFilm(director_name, film_id) {
  const [director] = await getDirector(director_name);
  await knex("DirectorsFilm").insert({film_id:film_id, director_id:director.director_id});
  return await getFilmById(film_id);
}

/**
 * Add the genre film pair into the Genre DB
 * 
 * @param {string} genre_name
 * @param {integer} film_id
 * @returns the updated film object
 */
export async function addGenreFilm(genre_name, film_id) {
  await knex("Genre").insert({film_id:film_id, genre_name:genre_name});
  return await getFilmById(film_id);
}

/**
 * Add the actor film pair into the Genre DB
 * 
 * @param {string} actor_name
 * @param {integer} film_id
 * @returns the updated film object
 */
export async function addActorFilm(actor_name, film_id) {
  await knex("Actors").insert({film_id:film_id, actor_name:actor_name});
  return await getFilmById(film_id);
}

/**
 * Add a new course to the Course DB
 * 
 * @param {Object} new_course
 * @returns the new course object from the DB
 */
export async function addNewCourse(new_course) {
  await knex("Course")
  .insert({
    course_number: new_course.course_number, 
    course_name: new_course.course_name,
    course_description: new_course.course_description ? new_course.course_description : ""
  });
  return await getCourseByCourseName(new_course.course_name);
}

/**
 * Add the course film pair into the CourseFilm DB
 * 
 * @param {string} course_name
 * @param {integer} film_id
 * @returns the updated film object
 */
export async function addCourseFilm(course_name, film_id) {
  const [course] = await getCourseByCourseName(course_name);
  await knex("CourseFilm").insert({film_id:film_id, course_number:course.course_number});
  return await getFilmById(film_id);
}


/**
 * Validates the film title
 * @param {string} title 
 * @returns empty if valid, error message if invalid
 */
export function validateFilmTitle(title) {
  if (title.length < 1) {
    return "Title is required";
  }
  if (title.length > 100) {
    return "Title is too long";
  }
  //check for invalid characters with regex, allow letters, numbers, spaces, dashes, and punctuation
  if (!/^[a-zA-Z0-9 -]+$/.test(title)) {
    return "Title contains invalid characters";
  }

  return "";
}

/**
 * Validates the semester field, e.g. "F21"
 * @param {string} semester 
 * @returns empty if valid, error message if invalid
 */
export function validateFilmSemester(semester) {
  if (semester.length === 3) {
    return "A semester must have a length of 3";
  }
  //check that a semester is F, W, or S, followed by 2 numbers
  if (!/^[FWS][0-9][0-9]$/.test(semester)) {
    return "Semester must be in the format FYY or WYY or SYY";
  }
  //check that the semester year is valid (that is is not in the future)
  const year = parseInt(semester.substring(1, 3)) + 2000;
  if (year > new Date().getFullYear() + 1) {
    //not sure if we need this +1 but it might help on the edge cases
    return "Semester year must be in the past";
  }

  return "";
}

/**
 * Validates the genre name, e.g. "Drama", "Sci-fi"
 * @param {string} genre 
 * @returns empty if valid, error message if invalid
 */
export function validateFilmGenre(genre) {
  if (genre.length < 1) {
    return "Genre is required";
  }
  if (genre.length > 100) {
    return "Genre is too long";
  }
  //check for invalid characters with regex, allow letters and dashes
  if (!/^[a-zA-Z-]+$/.test(genre)) {
    return "Genre contains invalid characters";
  }
  return "";
}

/**
 * Validates a course name, e.g. "Sight and Sound"
 * @param {string} course 
 * @returns empty if valid, error message if invalid
 */
export function validateFilmCourse(course) {
  if (course.length < 1) {
    return "Course is required";
  }
  if (course.length > 100) {
    return "Course is too long";
  }
  //check for invalid characters with regex, allow letters, spaces, dashes, and punctuation
  if (!/^[a-zA-Z0-9 -.;:'&/,]+$/.test(course)) {
    return "Course contains invalid characters";
  }

  return "";
}

/**
 * Validates the film overview(called logLine in front-end)
 * @param {string} overview - called logLine in front-end
 * @returns empty if valid, error message if invalid
 */
export function validateFilmOverview(overview) {
  if (overview.length < 1) {
    return "Overview is required";
  }
  if (overview.length > 160) {
    return "Overview is too long";
  }
  //check for invalid characters with regex, allow letters, numbers, spaces, dashes, and punctuation
  if (!/^[a-zA-Z0-9 -.;:'&/,]+$/.test(overview)) {
    return "Overview contains invalid characters";
  }

  return "";
}

/**
 * Validates the film descipriton(called overview in front-end)
 * @param {string} description 
 * @returns empty if valid, error message if invalid
 */
export function validateFilmDescription(description) {
  if (description.length < 1) {
    return "description is required";
  }
  if (description.length > 1000) {
    return "description is too long";
  }
  //check for invalid characters with regex, allow letters, numbers, spaces, dashes, and punctuation
  if (!/^[a-zA-Z0-9 -.;:'&/,]+$/.test(description)) {
    return "description contains invalid characters";
  }

  return "";
}

/**
 * Validates a string of actor names, e.g. "John Doe, Jane Doe, Someone Else"
 * @param {string} actors 
 * @returns empty if valid, error message if invalid
 */
export function validateFilmActors(actors) {
  if (actors.length < 1) {
    return "Actors are required";
  }
  if (actors.length > 1000) {
    return "Actors is too long";
  }
  //check for invalid characters with regex, allow letters, numbers, spaces, dashes, and punctuation
  if (!/^[a-zA-Z0-9 -,]+$/.test(actors)) {
    return "Actors contains invalid characters";
  }
  //require all names to be separated by a comma
  if (!/^[a-zA-Z0-9 -,]+(,[a-zA-Z0-9 -,]+)*$/.test(actors)) {
    return "Actors must be separated by commas";
  }

  return "";
}