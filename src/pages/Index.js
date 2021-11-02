import { useEffect, useState } from "react";
import CustomHead from "../components/CustomHead";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [searchResults, setSearchResults] = useState();
  const [ filterResults, setFilterResults] = useState;


  return (
    <div className={styles.container}>
          <CustomHead/>
          <Header searchResults={searchResults} filterResults={filterResults}/>
      <main>
        <h1 className="title">Final Project</h1>
        <p>Hooray, you got the project deployed!</p>
        <p>Now go and give it some content...</p>
      </main>

      <footer>A CS 312 Project</footer>
    </div>
  );
}