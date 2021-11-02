/* eslint-disable */
import '../styles/globals.css';
import { useState } from "react";
import data from "../../data/data.json";

function MyApp({ Component, pageProps }) {
  const [films, setFilms] = useState(data);

  const props = {...pageProps, films, setFilms};
  return <Component {...props} />;
}

export default MyApp;
