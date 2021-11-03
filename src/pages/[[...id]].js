import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import CustomHead from "../components/CustomHead";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";


export default function Home({films}) {

  const router = useRouter();
  const {id} = router.query;
  
  const [searchResults, setSearchResults] = useState();
  const [ filterResults, setFilterResults] = useState();

  
  const genreTemp = films.map((x) => x["genre_ids"]);
  const genreSet = new Set(genreTemp);
  const genreList = [...genreSet].sort();

  const classTemp = films.map((x) => x["class"]);
  const classSet = new Set(classTemp);
  const classList = [...classSet].sort();

  return (
    <div className={styles.container}>
          <CustomHead/>
          <Header  
            searchResults={searchResults} filterResults={filterResults}
            genreList={genreList} classList={classList}/>
      <main>
        <h1 className="title">Final Project</h1>
        <p>Hooray, you got the project deployed!</p>
        <p>Now go and give it some content...</p>
      </main>

      <footer>A CS 312 Project</footer>
    </div>
  );
}