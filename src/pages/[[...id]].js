import CustomHead from "../components/CustomHead";
import Header from "../components/Header";
import FilmRow from "../components/DisplayLayouts/FilmRow";

import styles from "../styles/Home.module.css";

import useFeatured from "../hooks/useFeatured";

export default function Home({films, genres, courses}) {


  // function uniqueField(field) {
  //   const fieldSet = new Set(films.map((x) => x[field]).flat(1));
  //   return [...fieldSet].sort();
  // }

  return (
    <div className={styles.container}>
      <CustomHead />
      <Header genreList={genres} classList={courses} />
      <main>
        <FilmRow displayType="wide" films={useFeatured(films)} title="Featured!" />
        <FilmRow films={films} title="All Films!" />
      </main>

      <footer>2021 Middlebury Movie Database</footer>
    </div>
  );
}