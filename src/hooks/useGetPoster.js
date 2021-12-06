import { useEffect, useState } from "react";

// get the poster of a film (by id) from api endpoint at /api/poster/[id]

export default function useGetPoster(id) {
  const [poster, setPoster] = useState();
  
  useEffect(async () => {
    const getPoster = async () => {
      
      const response = await fetch(`/api/poster/${id}`);
      if (!response.ok) {
        throw new Error(`Unable to fetch poster for film with id of: ${id}`);
      }
      const posterObject = await response.json();
      setPoster(posterObject.poster_data);
    }
    //console.log("b");
    await getPoster();
  }, [id])

  //console.log(poster);
  return poster;
}