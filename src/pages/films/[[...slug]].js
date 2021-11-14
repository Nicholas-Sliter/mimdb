import { useRouter } from "next/router"
import SingleFilmDisplay from "../../components/SingleFilmDisplay";
import styles from "../../styles/Home.module.css";
import CustomHead from "../../components/CustomHead";
import Header from "../../components/Header";

import useGetFilm from "../../hooks/useGetFilm";
import { useEffect, useState } from "react";

export default function Film() {
    const router = useRouter();
    const {slug} = router.query;
    
    /*
    const [myFilm, setMyFilm] = useState();

    useEffect(() => {
        setMyFilm(useGetFilm(slug));
    }, [slug]);
    */
    //console.log("...slug", slug);
    //const currentSlug = useCurrentSlug();
    //console.log("currentSlug", currentSlug);
    
    // function uniqueField(field) {
    //     const fieldSet = new Set(films.map((x) => x[field]).flat(1));
    //     return [...fieldSet].sort();
    // }

    return (
        <div className={styles.container}>
            <CustomHead />
                <Header
                    // genreList={uniqueField("genre")}
                    // classList={uniqueField("course")}
                />
            <SingleFilmDisplay film={useGetFilm(slug)}/>
            <footer>2021 Middlebury Movie Database</footer>
        </div>
    )
}