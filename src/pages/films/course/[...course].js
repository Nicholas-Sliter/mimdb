import { useRouter } from "next/router"
import FilmRow from "../../../components/DisplayLayouts/FilmRow"
import Header from "../../../components/Header"
import CustomHead from "../../../components/CustomHead"
import { useEffect, useState } from "react"
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
    <div>
      <CustomHead />
      <Header classList={courses} genreList={genres} />
      <main>
        <div className="container">
          <h1>Films created in {courseName}</h1>
          <h3>{courseDesc}</h3>
          <FilmRow films={genreFilmList} />
        </div>
      </main>
    </div>
  );

}