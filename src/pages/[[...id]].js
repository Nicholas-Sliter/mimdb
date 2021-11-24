import CustomHead from "../components/CustomHead";
import Header from "../components/Header";
import FilmRow from "../components/DisplayLayouts/FilmRow";
import FilmController from "../components/DisplayLayouts/FilmController";

import useFeatured from "../hooks/useFeatured";
import styles from "../styles/Home.module.css";


export default function Home({ films, genres, courses }) {

  const featured = useFeatured(2);
  console.log("featured: ", featured);
  return (
    <div className={styles.container}>
      <CustomHead />
      <Header genreList={genres} classList={courses} />
      <main>
        <FilmRow
          displayType="wide"
          films={featured}
          title="Featured Films!"
        />
        <FilmRow films={films} title="All Films! (No wrap)" wrap={false} />
        <FilmController
          title="Dramas"
          queryObj={{ genre: "Drama", course: "" }}
          rowStyleObject={{ displayType: "small", wrap: true }}
        />
        <FilmController
          title="Sci-Fi"
          queryObj={{ genre: "Sci-fi", course: "" }}
          rowStyleObject={{ displayType: "small", wrap: true }}
        />
      </main>

      <footer>
        © {`${new Date().getFullYear()}`} Middlebury Movie Database
      </footer>
    </div>
  );
}
