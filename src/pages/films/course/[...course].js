import { useRouter } from "next/router";
import FilmRow from "../../../components/DisplayLayouts/FilmRow";
import Layout from "../../../components/Layouts/Layout";
import { useEffect, useState } from "react";

import { decodeURIComponentSafe } from "../../../lib/frontend-utils";

import styles from "/src/styles/FilmCourse.module.scss";

export default function FilmsByCourse() {
  const router = useRouter();
  const { course } = router.query;

  //TODO : should start using hooks!
  //get data from server api and store the data in the state for this page
  const [genreFilmList, setGenreFilmList] = useState([]);
  const [courseDesc, setCourseDesc] = useState();

  //convert from uri encoding to text
  const courseName = decodeURIComponentSafe(course);

  useEffect(async () => {
    const res = await fetch(`/api/films?course=${course}`);
    if (!res.ok) {
      throw new Error("Failed to fetch films");
    }
    const data = await res.json();

    //accessing getCourseByCourseName (works!)
    const nextRes = await fetch(`/api/courses/${course}`);
    if (!nextRes.ok) {
      throw new Error("Failed to fetch course");
    }
    const thisCourse = await nextRes.json();

    setGenreFilmList(data);
    if (thisCourse[0]) {
      setCourseDesc(thisCourse[0].course_description);
    }
  }, [course]);

  const titleString = `MIMDB | ${courseName} Films`;

  return (
    <Layout pageTitle={titleString}>
      <div className={styles.courseContainer}>
        <h1>Films created in {courseName}</h1>
        <p>{courseDesc}</p>
      </div>
      <div className={styles.container}>
        <FilmRow films={genreFilmList} />
      </div>
    </Layout>
  );
}
