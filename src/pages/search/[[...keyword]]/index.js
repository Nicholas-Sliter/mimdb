import { useRouter } from "next/router";
import styles from "../../../styles/Search.module.scss";

import CustomHead from "../../../components/CustomHead";
//import SearchForm from "../../components/SearchForm";
//import SearchResults from "../../components/SearchResults";
import { useSearch } from "../../../hooks/useSearch";
import { decodeURIComponentSafe } from "../../../lib/frontend-utils";
import FilmRow from "../../../components/DisplayLayouts/FilmRow";
import Header from "../../../components/Header";
import { useState, useEffect } from "react";



export default function SearchPage() {
  const router = useRouter();
  const { keyword } = router.query;
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(async() => {
    setSearchTerm(decodeURIComponentSafe(keyword));
    //search the api and get the results
    const res = await fetch(`/api/search?keyword=${keyword}`);
    const data = await res.json();
    setSearchResults(data);
  }, [keyword]);

  //useEffect to fetch search results from API at /api/search?keyword=searchTerm
  //const { loading, results, error } = useSearch(searchTerm);

  // useEffect(async () => {
  //   const res = await fetch(`/api/search?keyword=${searchTerm}`);
  //   if (!res.ok) {
  //     throw new Error(`Could not fetch search results for ${searchTerm}`);
  //   }
  //   const data = await res.json();
  //   setSearchResults(data);
  // }, [searchTerm]);

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
    <div className={styles.container}>
      <CustomHead />
      <Header />
      <main>
        <h1>
          Search results for{" "}
          <span className={styles.searchTerm}>{searchTerm}</span>
        </h1>
        <FilmRow films={searchResults.map((element) => element.item)} />
        {/* <SearchForm />   <FilmRow films={useSearch({searchTerm:searchTerm})} /> */}
        {/* <SearchResults queryResults={useSearch(keyword)} filterBy={} sort={} /> */}
      </main>

      <footer>2021 Middlebury Movie Database</footer>
    </div>
  );
}
