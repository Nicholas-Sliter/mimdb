import { useRouter } from "next/router";
import FilmRow from "../../../components/DisplayLayouts/FilmRow";
import Header from "../../../components/Header";
import CustomHead from "../../../components/CustomHead";
import useFilmsByCategory from "../../../hooks/useFilmsByCategory";

export default function FilmsByGenre() {
  const router = useRouter();
  const { genre } = router.query;

  //convert from uri encoding to text
  const genreName = decodeURIComponent(genre);

  return (
    <div>
      <CustomHead />
      <Header/>
      <main>
        <div className="container">
          <h1>{`${genreName}`} Films</h1>
          <FilmRow films={useFilmsByCategory({category:"genre", value:genre})} />
        </div>
      </main>
    </div>
  );
}
