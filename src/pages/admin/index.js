import CustomHead from "../../components/CustomHead";
import Header from "../../components/Header";
import AdminPage from "../../components/AdminPage";

import styles from "../../styles/Home.module.css";
import { useEffect, useState } from "react";



export default function Admin() {
  const [films, setFilms] = useState([]);

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
    getAllFilms();
  }, []);

  const adminFunc = (apiCall, film) => {
    const helper = async () => {
      if (film) {
        const response = await fetch(`/api/films/${film.slug}/${apiCall}`, {
          method: "PUT"
        })

        if (!response.ok) {
          throw new Error(response.statusText)
        }
      }
    }
    helper();
  }

  return (
    <div className={styles.container}>
      <CustomHead />
      <Header />
      <main>

        <AdminPage films={films} adminFunc={adminFunc} />
      </main>

      <footer>
        © {`${new Date().getFullYear()}`} Middlebury Movie Database
      </footer>
    </div>
  );
}