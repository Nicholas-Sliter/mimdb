import { useState, useEffect } from "react";
import { DirectorNameContext } from "../../components/context/DirectorNameContext";
import CustomHead from "../../components/CustomHead";
import Header from "../../components/Header";
import Submit from "../../components/Submit";

import styles from "../../styles/Home.module.css";



export default function SubmitPage() {
  const [directorNames, setDirectorNames] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(async () => {
    const directorNameRes = await fetch("/api/directors");
    if (!directorNameRes.ok) {
      throw new Error("Failed to fetch director name information from api");
    }
    const director_names = await directorNameRes.json();

    const allCoursesRes = await fetch("/api/courses/all");
    if (!allCoursesRes.ok) {
      throw new Error("Failed to fetch director name information from api");
    }
    const allCourses = await allCoursesRes.json();

    setCourses(allCourses);
    setDirectorNames(director_names);
  }, []);


  const submitComplete = async (content) => {
    const postSubmit = async () => {
      const response = await fetch("/api/submit", {
        method: "POST",
        body: JSON.stringify(content),
        headers: new Headers({ "Content-Type": "application/json" })
      });
      let error=null;
      if (!response.ok) {
        error = new Error(response.statusText);
      }

      return ({ok:response.ok, error});
    }
    return await postSubmit();
  }

  const DirectorNameContextObject = { director_names: directorNames };
  
  return (
    <div className={styles.container}>
      <CustomHead />
      <Header />
      <main>
        <DirectorNameContext.Provider value={DirectorNameContextObject}>
          <Submit allCourses={courses} complete={submitComplete}/>
        </DirectorNameContext.Provider>
      </main>

      <footer>
         © {`${new Date().getFullYear()}`} Middlebury Movie Database
      </footer>
    </div>
  );
}