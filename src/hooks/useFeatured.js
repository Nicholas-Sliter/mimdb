import { useState, useEffect } from "react";
import useResolveQuery from "./useResolveQuery";
import useGetRandomFilms from "./useGetRandomFilms";


  /* Randomize array in-place using Durstenfeld shuffle algorithm */
// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   }


export default function useFeatured(number) {
  const [featured, setFeatured] = useState([]);
  //get all films, no filtering
  const films = useGetRandomFilms(number);
  console.log("random featured films: ", films);


  useEffect(() => {
    setFeatured(films);
  }, [films]);

  console.log("featured (in useFeatured: ", featured);
  return featured;
}


  // numWanted is an integer parameter for how many random films need to be generated
//   function getFeatured(numWanted) {
//     const collectionCopy = films.map((movie) => movie);

//     shuffleArray(collectionCopy);

//     const featured = collectionCopy.slice(
//       0,
//       Math.min(numWanted + 1, films.length)
//     );

//     return featured;
//   }
