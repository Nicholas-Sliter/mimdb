import { useEffect, useState } from "react";

// get a film object from api endpoint at /api/films/random/[number]

export default function useGetRandomFilms(number) {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    async function fetchFilms() {
      // eslint-disable-next-line
      const response = await fetch(`/api/films/random/${number}`);

      if (!response.ok) {
        throw new Error(`Unable to fetch ${number} random films`);
      }
      const tempfilms = await response.json();
      setFilms(tempfilms);
    }

    //fetch once
    if (!films || films.length !== number){
      fetchFilms();
    }

  }, [number]);

  return films;
}
