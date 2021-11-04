/* eslint-disable */
import '../styles/globals.css';
import { useState } from "react";

function MyApp({ Component, pageProps }) {

  const props = {...pageProps};
  return <Component {...props} />;
}

export default MyApp;
