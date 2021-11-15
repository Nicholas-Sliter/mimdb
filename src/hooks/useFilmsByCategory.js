import { useState, useEffect } from "react";

export default function useFilmsByCategory({ category, value }) {
  const [categoryFilmList, setCategoryFilmList] = useState([]);

  useEffect(async () => {
    if (!value) {
      return;
    }
    const res = await fetch(`/api/films?${category}=${value}`);
    if (!res.ok) {
      throw new Error("Failed to fetch films");
    }
    const data = await res.json();
    setCategoryFilmList(data);
  }, [category, value]);
  
  return categoryFilmList;
}
