import { useEffect, useState } from "react";
import { default_grey_svg } from "../lib/frontend-utils";

/**
 * get the backdrop of a film (by slug) from api endpoint at /api/films/[slug]/backdrop
 * @param {string} slug 
 * @returns the backdrop data, in the form of base64 string
 */
export default function useGetBackdrop(slug) {
  const [backdropData, setBackdropData] = useState(default_grey_svg);
  
  useEffect(async () => {
    if (slug==="temp") {
      setBackdropData(default_grey_svg);
      return;
    }

    const getBackdrop = async () => {
      
      const response = await fetch(`/api/films/${slug}/backdrop`);
      if (!response.ok) {
        throw new Error(`Unable to fetch backdrop for film with slug of: ${slug}`);
      }
      const backdropObject = await response.json();
      setBackdropData(backdropObject.backdrop_data);
    }
    await getBackdrop();

  }, [slug])

  return backdropData;
}