/* eslint-disable */
import "../styles/globals.css";
import { useState, useEffect } from "react";

import { Provider } from 'next-auth/client';
import { GenreCourseContext } from '../components/context/GenreCourseContext';
import { DiscoverContext } from "../components/context/DiscoverContext";
import useFeatured from "../hooks/useFeatured";

function MyApp({ Component, pageProps }) {
  const [genres, setGenres] = useState([]);
  const [courses, setCourses] = useState([]);
  const [discover, setDiscover] = useState([]);
  const [loading, setLoading] = useState(true);

  const featured = useFeatured(2, loading);

  //get genres and courses from /api/genres and /api/courses
  useEffect(async () => {

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



  useEffect(() => {
    //set discover courses
    if (featured && featured.length && loading) {
      setDiscover(featured);
      setLoading(false);
    }
  }, [featured]);

  const GenreCourseContextObject = { genres: genres, courses: courses };
  const DiscoverContextObject = { films: discover };
  const props = { ...pageProps };
  return (
    <Provider>
      <GenreCourseContext.Provider value={GenreCourseContextObject}>
        <DiscoverContext.Provider value={DiscoverContextObject}>
          <Component {...props} />
        </DiscoverContext.Provider>
      </GenreCourseContext.Provider>
    </Provider>
  );
}

export default MyApp;
