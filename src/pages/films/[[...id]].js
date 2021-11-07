import { useRouter } from "next/router";
import SingleFilmDisplay from "../../components/SingleFilmDisplay";
import styles from "../../styles/Home.module.css";
import CustomHead from "../../components/CustomHead";
import Header from "../../components/Header";

export default function Film({films}) {
    const router = useRouter();
    const {id} = router.query;

    function uniqueField(field) {
        const fieldSet = new Set(films.map((x) => x[field]).flat(1));
        return [...fieldSet].sort();
      }

    let currFilm;
    if (id !== undefined) {
        currFilm = films.find( (film)=>film.id === parseInt(id));
        return (
            <div className={styles.container}>
            <CustomHead />
                <Header
                    genreList={uniqueField("genre")}
                    classList={uniqueField("course")}
                />
            <SingleFilmDisplay/>
            <footer>2021 Middlebury Movie Database</footer>
            </div>
        )
    } else {
        return <p>Choose a Film!</p>
    }
}