import DirectorPage from "../../components/DirectorPage";
import CustomHead from "../../components/CustomHead";
import Header from "../../components/Header";
import { useEffect, useState } from "react"

import { useRouter } from "next/router"



export default function Director({genres, courses}) {


  const router = useRouter()
  const { director } = router.query

  //const directorName = decodeURIComponent(director)


  const [directorInfo, setDirectorInfo] = useState([])

  const [directorFilms, setDirectorFilms] = useState([])



    

    useEffect(async() => {

      const res2 = await fetch(`/api/films?director=${director}`);
      if (!res2.ok){
        throw new Error("Failed to fetch films")
      }

      const data2 = await res2.json()

      setDirectorFilms(data2);

    },[director])



    useEffect(async() => {

      const res = await fetch(`/api/directors/${director}`);

    
  
        if (!res.ok){
          throw new Error("Failed to fetch director")
        }
  
      const data = await res.json()
  
      setDirectorInfo(data);
  
  
      }, [director])



    return (
      <div /*className={styles.container}*/>
        <CustomHead />
        <Header genreList={genres} classList={courses} />
        <main>
          <DirectorPage films={directorFilms} director={directorInfo[0]}/>
        </main>
        <footer>
           © {`${new Date().getFullYear()}`} Middlebury Movie Database
        </footer>
      </div>
    );
  }