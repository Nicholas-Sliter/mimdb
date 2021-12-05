import { useState, useEffect } from "react";
import useGetRandomFilms from "./useGetRandomFilms";

export default function useFeatured(number=2) {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const films = useGetRandomFilms(number);


  useEffect(() => {
    if (films && films.length && loading) {
      setFeatured(films);
      setLoading(false);
    }
  }, [films]);

  return featured;
}
