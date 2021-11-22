import { useRouter } from "next/router"
import FilmRow from "../../../components/DisplayLayouts/FilmRow"
import Header  from "../../../components/Header"
import CustomHead from "../../../components/CustomHead"
import { useEffect, useState } from "react"


export default function FilmsByCourse({ genres, courses }) {

   const router = useRouter()
   const { course } = router.query

   //convert from uri encoding to text
   const courseName = decodeURIComponent(course)


   //TODO : should start using hooks!
   //get data from server api and store the data in the state for this page
   const [genreFilmList, setGenreFilmList] = useState([])

   useEffect(async() => {
      const res = await fetch(`/api/films?course=${course}`);
      if (!res.ok){
         throw new Error("Failed to fetch films")
      }
      const data = await res.json()
      setGenreFilmList(data);
   }, [course])




return (
  <div>
    <CustomHead />
    <Header classList={courses} genreList={genres} />
    <main>
      <div className="container">
        <h1>Films created in {courseName}</h1>
        <FilmRow films={genreFilmList} />
      </div>
    </main>
  </div>
);

}