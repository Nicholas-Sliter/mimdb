import { useRouter } from "next/router";
import styles from "../../../styles/Search.module.scss";
import { decodeURIComponentSafe } from "../../../lib/frontend-utils";
import FilmRow from "../../../components/DisplayLayouts/FilmRow";

import Layout from "../../../components/Layouts/Layout";

import { useState, useEffect } from "react";

export default function SearchPage() {
  const router = useRouter();
  const { keyword } = router.query;
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  //useEffect to fetch search results from API at /api/search?keyword=searchTerm
  useEffect(async () => {
    setSearchTerm(decodeURIComponentSafe(keyword));
    //search the api and get the results
    const res = await fetch(`/api/search?keyword=${keyword}`);
    const data = await res.json();
    setSearchResults(data);
  }, [keyword]);

  //combind these two with conditional rendering

  //default page for no search term or malformed search term
  if (!searchTerm) {
    return (
      <div>
        <CustomHead title="Search" />
        <Header />
        <div className={styles.container}>
          <h1>Search</h1>
          <p>Enter a search term above to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1>
          Search results for{" "}
          <span className={styles.searchTerm}>{searchTerm}</span>
        </h1>
        <FilmRow films={searchResults.map((element) => element.item)} />
      </div>
    </Layout>
  );
}
