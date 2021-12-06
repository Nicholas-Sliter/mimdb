import FilmRow from "../components/DisplayLayouts/FilmRow";
import FilmController from "../components/DisplayLayouts/FilmController";
import Layout from "../components/Layouts/Layout";
import LoginWidget from "../components/LoginWidget";
import SecureItem from "../components/SecureItem";

import useFeatured from "../hooks/useFeatured";


//need to remove films here and modify useFeatured
export default function Home({films}) {
  return (
    <Layout>
      <LoginWidget />
      <SecureItem />
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
