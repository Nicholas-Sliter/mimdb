import { useRouter } from "next/router"
import SingleFilmDisplay from "../../components/SingleFilmDisplay";
import styles from "../../styles/Home.module.css";
import CustomHead from "../../components/CustomHead";
import Header from "../../components/Header";

import useGetFilm from "../../hooks/useGetFilm";

export default function Film() {
    const router = useRouter();
    const {slug} = router.query;

    return (
        <div className={styles.container}>
            <CustomHead />
                <Header />
            <SingleFilmDisplay film={useGetFilm(slug)}/>
            <footer>2021 Middlebury Movie Database</footer>
        </div>
    )
}