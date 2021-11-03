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

  
/*
  const genreTemp = films.forEach((x) => {
    if (x.genre_ids.length() > 1){
      x.genre_ids.forEach((y) => {
        genres.add(y)
      })
    }
    else{
      genres.add(x.genre_ids)
    }
  })

  const genres = new Set(genreTemp);
*/



  return (
    <div className={styles.container}>
          <CustomHead/>
          <Header  searchResults={searchResults} filterResults={filterResults}/>
      <main>
        <h1 className="title">Final Project</h1>
        <p>Hooray, you got the project deployed!</p>
        <p>Now go and give it some content...</p>
      </main>

      <footer>A CS 312 Project</footer>
    </div>
  );
}