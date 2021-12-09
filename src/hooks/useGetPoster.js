import { useEffect, useState } from "react";
import { default_grey_svg } from "../lib/frontend-utils";

/**
 * get the poster of a film (by slug) from api endpoint at /api/films/[slug]/poster
 * @param {string} slug 
 * @returns the poster data, in the form of base64 string
 */
export default function useGetPoster(slug) {
  const [posterData, setPosterData] = useState(default_grey_svg);
  
  useEffect(async () => {
    if (slug==="temp") {
      setPosterData(default_grey_svg);
      return;
    }

    const getPoster = async () => {
      const response = await fetch(`/api/films/${slug}/poster`);
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