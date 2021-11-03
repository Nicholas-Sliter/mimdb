//import { useEffect, useState } from "react";
//import { useRouter } from "next/router";

import CustomHead from "../components/CustomHead";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";


export default function Home({films}) {

  //const router = useRouter();
  //const {id} = router.query;
  //const [searchResults, setSearchResults] = useState();
  //const [ filterResults, setFilterResults] = useState();

  function uniqueField(field) {
    const fieldSet = new Set(films.map((x) => x[field]));
    return [...fieldSet].sort();
  }

  return (
    <div className={styles.container}>
          <CustomHead/>
          <Header
            genreList={uniqueField("genre_ids")} classList={uniqueField("class")}
          />
      <main>
        <h1 className="title">Final Project</h1>
        <p>Hooray, you got the project deployed!</p>
        <p>Now go and give it some content...</p>
      </main>

      <footer>A CS 312 Project</footer>
    </div>
  );
}