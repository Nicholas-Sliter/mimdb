/* eslint-disable */
import '../styles/globals.css';
import { useState, useEffect } from "react";
import { GenreCourseContext } from '../components/context/GenreCourseContext';

function MyApp({ Component, pageProps }) {

  const [genres, setGenres] = useState([]);
  const [courses, setCourses] = useState([]);

  //get genres and courses from /api/genres and /api/courses
  useEffect( async() => {
    const genreRes = await fetch("/api/genres");
    const courseRes = await fetch("/api/courses");
    if (!genreRes.ok || !courseRes.ok) {
      throw new Error("Failed to fetch genre and course information from api");
    }

    const genres = await genreRes.json();
    const courses = await courseRes.json();

    setGenres(genres);
    setCourses(courses);
  }, []);



  const GenreCourseContextObject = {genres: genres, courses: courses};
  const props = { ...pageProps};
  return (
    <GenreCourseContext.Provider value={GenreCourseContextObject}>
      <Component {...props} />
    </GenreCourseContext.Provider>
  );
}

export default MyApp;
