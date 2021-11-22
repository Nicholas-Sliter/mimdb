import DirectorPage from "../../components/DirectorPage";
import CustomHead from "../../components/CustomHead";
import Header from "../../components/Header";
import { useEffect, useState } from "react"

import { useRouter } from "next/router"



export default function Director({ genres, courses }) {


  const router = useRouter();
  const { director } = router.query;

  //const directorName = decodeURIComponent(director)

  const [directorInfo, setDirectorInfo] = useState([]);
  const [directorFilms, setDirectorFilms] = useState([]);

  const getDirectorFilms = async () => {
    const response = await fetch(`/api/films?director=${director}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch films by ${director}`)
    }
    const data2 = await response.json();
    setDirectorFilms(data2);
  }

  const getDirectorInfo = async () => {
    const res = await fetch(`/api/directors/${director}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch director ${director}`)
    }
    const data = await res.json();
    setDirectorInfo(data);
  }

  useEffect( () => {
    getDirectorFilms();
    getDirectorInfo();
  }, [director]);

  return (
    <div>
      <CustomHead />
      <Header genreList={genres} classList={courses} />
      <main>
        {directorInfo[0] &&
          <DirectorPage films={directorFilms} director={directorInfo[0]} />
        }
      </main>
      <footer>
        © {`${new Date().getFullYear()}`} Middlebury Movie Database
      </footer>
    </div>
  );
}