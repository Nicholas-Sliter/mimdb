import { useEffect, useState } from "react";

/**
 * get the backdrop of a film (by id) from api endpoint at /api/backdrop/[id]
 * @param {integer} id 
 * @returns the backdrop data, in the form of base64 string
 */
export default function useGetBackdrop(id) {
  const [backdropData, setBackdropData] = useState("");
  
  useEffect(async () => {
    const getBackdrop = async () => {
      
      const response = await fetch(`/api/backdrop/${id}`);
      if (!response.ok) {
        throw new Error(`Unable to fetch backdrop for film with id of: ${id}`);
      }
      const backdropObject = await response.json();
      console.log(response);
      setBackdropData(backdropObject.Backdrop_data);
    }
    await getBackdrop();

  }, [id])

  return backdropData;
}