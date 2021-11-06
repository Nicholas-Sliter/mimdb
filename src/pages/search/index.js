import { useRouter } from "next/router";
import styles from "../../styles/Search.module.scss";

import CustomHead from "../../components/CustomHead";
//import SearchForm from "../../components/SearchForm";
//import SearchResults from "../../components/SearchResults";
//import { useSearch } from "../../hooks/useSearch";
import Header from "../../components/Header";


export default function Search() {
  const router = useRouter();
  const {
    query,
  } = router.query;

  return (
    <div className={styles.container}>
      <CustomHead />
      <Header
      />
      <main>
         <h1>Search</h1>
      </main>

      <footer>2021 Middlebury Movie Database</footer>
    </div>
  );
}
