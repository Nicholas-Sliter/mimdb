import CustomHead from "../components/CustomHead";
import Header from "../components/Header";
import FilmRow from "../components/DisplayLayouts/FilmRow";

import useFeatured from "../hooks/useFeatured";

import styles from "../styles/Home.module.css";

import useFeatured from "../hooks/useFeatured";

export default function Home({films, genres, courses}) {

  const featured = useFeatured({ collection: films, number: 2 });
  //console.log(featured)

  return (
    <div className={styles.container}>
      <CustomHead />
      <Header genreList={genres} classList={courses} />
      <main>

        <FilmRow
          displayType="wide"
          films={useFeatured(films)}
          title="Featured Films!"
        />
        <FilmRow films={films} title="All Films!" />
      </main>

      <footer>
         © {`${new Date().getFullYear()}`} Middlebury Movie Database
      </footer>
    </div>
  );
}