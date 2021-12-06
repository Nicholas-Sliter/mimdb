import { useEffect, useState } from "react";

/**
 * get the poster of a film (by slug) from api endpoint at /api/poster/[slug]
 * @param {string} slug 
 * @returns the poster data, in the form of base64 string
 */
export default function useGetPoster(slug) {
  const [posterData, setPosterData] = useState("");
  
  useEffect(async () => {
    const getPoster = async () => {
      const response = await fetch(`/api/poster/${slug}`);
      if (!response.ok) {
        throw new Error(`Unable to fetch poster for film with slug of: ${slug}`);
      }
      const posterObject = await response.json();
      setPosterData(posterObject.poster_data);
    }
    await getPoster();
    
  }, [slug])

  return posterData;
}