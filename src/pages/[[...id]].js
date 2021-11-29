import CustomHead from "../components/CustomHead";
import Header from "../components/Header";
import FilmRow from "../components/DisplayLayouts/FilmRow";
import FilmController from "../components/DisplayLayouts/FilmController";
import Layout from "../components/Layouts/Layout"

import useFeatured from "../hooks/useFeatured";
import styles from "../styles/Home.module.css";

//need to remove films here and modify useFeatured
export default function Home({films}) {
  return (
    <Layout>
      <FilmRow
        displayType="wide"
        films={useFeatured(films)}
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
    </Layout>
  );
  
}
