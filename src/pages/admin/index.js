import Layout from "../../components/Layouts/Layout";
import AdminPage from "../../components/AdminPage";

import { useEffect, useState } from "react";
import LoginWidget from "../../components/LoginWidget";
import SecureItem from "../../components/SecureItem";



export default function Admin() {
  const [films, setFilms] = useState([]);
  const [outdated, setOutdated] = useState(true);
  
  let denied = false;

  // fetch ALL films
  useEffect(() => {
    const getAllFilms = async () => {
      const response = await fetch(`/api/films/all`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const filmData = await response.json();
      setFilms(filmData);
    }
    if (outdated) {
      getAllFilms();
    }
    setOutdated(false);
  }, [outdated]);

  const adminFunc = (apiCall, film) => {
    const helper = async () => {
      if (film) {
        const response = await fetch(`/api/films/${film.slug}/${apiCall}`, {
          method: "PUT"
        })

        if (!response.ok) {
          throw new Error(response.statusText)
        }
        setOutdated(true);
      }
    }
    helper();
  }

  return (
    <Layout pageTitle="MIMDB | Admin Dashboard">
      <LoginWidget />
      <SecureItem />
      <AdminPage films={films} adminFunc={adminFunc} />
    </Layout>
  );
}