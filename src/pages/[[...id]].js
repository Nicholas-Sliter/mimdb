//import { useEffect, useState } from "react";
//import { useRouter } from "next/router";

import CustomHead from "../components/CustomHead";
import Header from "../components/Header";
//import SmallCard from "../components/FilmCards/SmallCard";
import FilmRow from "../components/DisplayLayouts/FilmRow";
import WideCard from "../components/FilmCards/WideCard";

import styles from "../styles/Home.module.css";


export default function Home({films, genres, courses}) {


  // function uniqueField(field) {
  //   const fieldSet = new Set(films.map((x) => x[field]).flat(1));
  //   return [...fieldSet].sort();
  // }

  return (
    <div className={styles.container}>
      <CustomHead />
      <Header genreList={genres} classList={courses} />
      <main>
        <h1 className="title">Final Project</h1>
        <p>Hooray, you got the project deployed!</p>
        <p>Now go and give it some content...</p>
        <WideCard film={films[2]} onClickFunction={() => {}} />
        <FilmRow films={films} title="Testing!" />
      </main>

      <footer>2021 Middlebury Movie Database</footer>
    </div>
  );
}