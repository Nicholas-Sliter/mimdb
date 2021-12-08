import { useRouter } from "next/router"
import FilmRow from "../../../components/DisplayLayouts/FilmRow"
import Layout from "../../../components/Layouts/Layout"
import { useEffect, useState } from "react"
import styles from "../../../styles/CourseDescrip.module.scss"
//import decodeURIComponentSafe from "../../../lib/frontend-utils"


export default function FilmsByCourse() {

  const router = useRouter()
  const { course } = router.query
  //const { courseDesc } = router.query

  //convert from uri encoding to text
  const courseName = decodeURIComponent(course)
  // how do i access a course desc when it seems all that is being passed rn is the course name?
  //  const courseDesc= getCourseByCourseName(course)

  //TODO : should start using hooks!
  //get data from server api and store the data in the state for this page
  const [genreFilmList, setGenreFilmList] = useState([]);
  const [courseDesc, setCourseDesc] = useState();

  useEffect(async () => {
    const res = await fetch(`/api/films?course=${course}`);
    if (!res.ok) {
      throw new Error("Failed to fetch films")
    }
    const data = await res.json()

    //accessing getCourseByCourseName (works!)
    const nextRes = await fetch(`/api/courses/${course}`);
    if (!nextRes.ok) {
      throw new Error("Failed to fetch course")
    }
    const thisCourse = await nextRes.json()

    setGenreFilmList(data);
    if (thisCourse[0]) {
      setCourseDesc(thisCourse[0].course_description);
    }
  }, [course])


  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Films created in {courseName}</h1>
        <h4 className={styles.courseDesc}>{courseDesc}</h4>
        <FilmRow films={genreFilmList} />
      </div>
    </Layout>
  );

}