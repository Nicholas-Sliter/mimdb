import CustomHead from "../../components/CustomHead";
import Header from "../../components/Header";
//import FilmRow from "../components/DisplayLayouts/FilmRow";
import Submit from "../../components/Submit"

//import useFeatured from "../hooks/useFeatured";

import styles from "../../styles/Home.module.css";

export default function Home({genres, courses}) {

  return (
    <div className={styles.container}>
      <CustomHead />
      <Header genreList={genres} classList={courses} />
      <main>
        <Submit genres={genres} courses={courses}/>
      </main>

      <footer>
         © {`${new Date().getFullYear()}`} Middlebury Movie Database
      </footer>
    </div>
  );
}