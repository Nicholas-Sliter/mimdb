import { useEffect, useState } from "react";

/**
 * get the backdrop of a film (by slug) from api endpoint at /api/backdrop/[slug]
 * @param {string} slug 
 * @returns the backdrop data, in the form of base64 string
 */
export default function useGetBackdrop(slug) {
  const [backdropData, setBackdropData] = useState("");
  
  useEffect(async () => {
    const getBackdrop = async () => {
      
      const response = await fetch(`/api/backdrop/${slug}`);
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