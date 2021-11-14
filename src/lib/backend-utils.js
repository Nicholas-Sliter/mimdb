/**
 * Backend utility functions
 * 
 * Borrowed from Practicle7. This practice of using a golden copy of .json will be replaced later by database.
 * 
 * The assumption is that the working data store is found in data/films.json and we have a "golden copy" in data/mockData.json.
 */

import fs from "fs";
import path from "path";
import process from "process";

import knexConfig from "../../knexfile";
import knexInitializer from "knex";


export function resetData() {
  const dataDirectory = path.join(process.cwd(), "data");
  const orig = path.join(dataDirectory, "data.json");
  const dest = path.join(dataDirectory, "tempData.json");
  fs.copyFileSync(orig, dest);
}


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


export const knex = knexInitializer(
  knexConfig[process.env.NODE_ENV || "development"]
);

/**
 * Get the list of genre names for a film.
 * 
 * @param {integer} id 
 * @returns an array of genre names for film with id id
 */
export async function getGenres(id){
  const genres = await knex.select("genre_name")
    .from("Genre")
    .where({"film_id": id});
  return genres.map((entry) => entry.genre_name);
}

/**
 * Get the list of languages for a film.
 * 
 * @param {integer} id 
 * @returns an array of languages for film with id id
 */
 export async function getLanguage(id){
  const languages = await knex.select("lang_name")
    .from("Language")
    .where({"film_id": id});
  return languages.map((entry) => entry.lang_name);
}

/**
 * Get the list of course names for a film.
 * 
 * @param {integer} id 
 * @returns an array of course names for film with id id
 */
 export async function getCourse(id){
  const courses = await knex.select("course_name")
    .from("Course")
    .where({"film_id": id});
  return courses.map((entry) => entry.course_name);
}

/**
 * Get the list of director names for a film.
 * 
 * @param {integer} id 
 * @returns an array of director names for film with id id
 */
 export async function getDirectors(id){
  const directors = await knex.select("director_name")
    .from("Directors")
    .where({"film_id": id});
  return directors.map((entry) => entry.director_name);
}

/**
 * Get the list of actor names for a film.
 * 
 * @param {integer} id 
 * @returns an array of actor names for film with id id
 */
 export async function getActors(id){
  const actors = await knex.select("actor_name")
    .from("Actors")
    .where({"film_id": id});
  return actors.map((entry) => entry.actor_name);
}

/**
 * Get the list of contributor names for a film.
 * 
 * @param {integer} id 
 * @returns an array of contributor names for film with id id
 */
 export async function getContributors(id){
  const contributors = await knex.select("contributor_name")
    .from("Contributors")
    .where({"film_id": id});
  return contributors.map((entry) => entry.contributor_name);
}

/**
 * Get the list of the names of all genres present in the database
 * 
 * @returns an array of all genre names for all films in the database
 */
 export async function getAllGenres(id){
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
 export async function getAllCourses(id){
  const allCourseEntries = await knex.select()
    .from("Course");
  const allCourseNames = new Set(allCourseEntries.map((entry) => entry.course_name).flat());
  return Array.from(allCourseNames);
}

/**
 * Get all of the films from the database
 * 
 * @returns an array of all films
 */
 export async function getAllFilms(){
  const films = await knex("Film").select();
  await Promise.all(
    films.map(async (film) => {
      film.genres = await getGenres(film.id);
    }));
  return films;
}

/**
 * Get a single film from the database by its id
 * 
 * @param {integer} id 
 * @returns the film associated with id id
 */
 export async function getFilmById (id) {
  const [film] = await knex("Film").select().where({id: id});
  if (film) {
    return {
      ...film,
      genres: await getGenres(film.id),
      language: await getLanguage(film.id),
      course: await getCourse(film.id),
      directors: await getDirectors(film.id),
      actors: await getActors(film.id),
      contributors: await getContributors(film.id),
    }
  } else {
    return null;
  }
}

/**
 * Get a single film from the database by its slug
 * 
 * @param {string} slug 
 * @returns the film associated with slug
 */
 export async function getFilmBySlug (slug) {
  const [film] = await knex("Film").select().where({slug: slug});
  if (film) {
    return {
      ...film,
      genres: await getGenres(film.id),
      language: await getLanguage(film.id),
      course: await getCourse(film.id),
      directors: await getDirectors(film.id),
      actors: await getActors(film.id),
      contributors: await getContributors(film.id),
    }
  } else {
    return null;
  }
}


