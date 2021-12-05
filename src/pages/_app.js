/* eslint-disable */
import '../styles/globals.css';
import { useState, useEffect } from "react";
//import data from "../../data/tempData.json";
import { GenreCourseContext } from '../components/context/GenreCourseContext';

function MyApp({ Component, pageProps }) {
  //temporary data


  //TODO: we will not have films here
  const [films, setFilms] = useState([]);
  const [genres, setGenres] = useState([]);
  const [courses, setCourses] = useState([]);

  //get genres and courses from /api/genres and /api/courses
  useEffect( async() => {
    //const filmRes = await fetch("api/films");
    const genreRes = await fetch("/api/genres");
    const courseRes = await fetch("/api/courses");
    if (!genreRes.ok || !courseRes.ok) {
      throw new Error("Failed to fetch genre and course information from api");
    }

    //const films = await filmRes.json();
    const genres = await genreRes.json();
    const courses = await courseRes.json();
    //setFilms(films);
    setGenres(genres);
    setCourses(courses);
  }, []);


  const GenreCourseContextObject = {genres: genres, courses: courses};
  const props = { ...pageProps, films, setFilms };
  return (
    <GenreCourseContext.Provider value={GenreCourseContextObject}>
      <Component {...props} />
    </GenreCourseContext.Provider>
  );
}

export default MyApp;


// genres, courses