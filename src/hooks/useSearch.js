import { useState, useEffect } from "react";

export default function useSearch({searchTerm}) {
  //use search term to memoize the search results
  const [searchResults, setSearchResults] = useState([]);

  useEffect(async () => {
    const res = await fetch(`/api/search?keyword=${searchTerm}`);
    if (!res.ok) {
      throw new Error(`Could not fetch search results for ${searchTerm}`);
    }
    const data = await res.json();
    setSearchResults(data);
  }, [searchTerm]);

  return searchResults;
}
