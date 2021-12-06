import { useEffect, useState } from "react";

/**
 * get the poster of a film (by id) from api endpoint at /api/poster/[id]
 * @param {integer} id 
 * @returns the poster data, in the form of base64 string
 */
export default function useGetPoster(id) {
  const [posterData, setPosterData] = useState("");
  
  useEffect(async () => {
    const getPoster = async () => {
      
      const response = await fetch(`/api/poster/${id}`);
      if (!response.ok) {
        throw new Error(`Unable to fetch poster for film with id of: ${id}`);
      }
      const posterObject = await response.json();
      setPosterData(posterObject.poster_data);
    }
    await getPoster();
    
  }, [id])

  return posterData;
}