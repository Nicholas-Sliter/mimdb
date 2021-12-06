import { useRouter } from "next/router"
import SingleFilmDisplay from "../../components/SingleFilmDisplay";
import styles from "../../styles/Home.module.css";
import Layout from "../../components/Layouts/Layout";

import useGetFilm from "../../../hooks/useGetFilm";

export default function Film() {
    const router = useRouter();
    const {slug} = router.query;

    return (
        <Layout>
            <SingleFilmDisplay film={useGetFilm(slug)}/>
        </Layout>
    )
}
