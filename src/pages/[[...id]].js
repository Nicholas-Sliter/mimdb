//import { useEffect, useState } from "react";
//import { useRouter } from "next/router";

import CustomHead from "../components/CustomHead";
import Header from "../components/Header";
//import SmallCard from "../components/FilmCards/SmallCard";
import FilmRow from "../components/DisplayLayouts/FilmRow";
//import WideCard from "../components/FilmCards/WideCard";

import styles from "../styles/Home.module.css";


export default function Home({films}) {

  function uniqueField(field) {
    const fieldSet = new Set(films.map((x) => x[field]).flat(1));
    return [...fieldSet].sort();
  }

  return (
    <div className={styles.container}>
      <CustomHead />
      <Header
        genreList={uniqueField("genre")}
        classList={uniqueField("course")}
      />
      <main>
        <FilmRow displayType="wide" films={[films[0],films[5]]} />
        <FilmRow displayType="small" films={films.filter((film) => "Action" in film.genre)} />
        <FilmRow films={films} title="All Mock Films!" />
      </main>

      <footer>2021 Middlebury Movie Database</footer>
    </div>
  );
}