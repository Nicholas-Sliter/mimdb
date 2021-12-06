import FilmRow from "../components/DisplayLayouts/FilmRow";
import FilmController from "../components/DisplayLayouts/FilmController";
import Layout from "../components/Layouts/Layout";
import { useContext } from "react";

import { DiscoverContext } from "../components/context/DiscoverContext";
import { getLastTerm, convertTermToString } from "../lib/frontend-utils";

import useFeatured from "../hooks/useFeatured";

import styles from "../styles/Home.module.css";

//need to remove films here and modify useFeatured
export default function Home({}) {

  const discover = useContext(DiscoverContext);

  const term = getLastTerm();
  const termString = convertTermToString(term);

  return (
    <Layout>
      <FilmRow
        displayType="wide"
        films={discover.films}
        title="Discover Queue"
      />
      <FilmController
        title={`Recent Films: ${termString ?? ""}`}
        queryObj={{ genre: "", course: "", term: term }}
        rowStyleObject={{ displayType: "small", wrap: false }}
      />
      <FilmController
        title="Dramas"
        queryObj={{ genre: "Drama", course: "" }}
        rowStyleObject={{ displayType: "small", wrap: false }}
      />
      <FilmController
        title="Sci-Fi"
        queryObj={{ genre: "Sci-fi", course: "" }}
        rowStyleObject={{ displayType: "small", wrap: false }}
      />
      <FilmController
        title="All Films"
        queryObj={{ genre: "", course: "" }}
        rowStyleObject={{ displayType: "small", wrap: false }}
      />
    </Layout>
  );
}
