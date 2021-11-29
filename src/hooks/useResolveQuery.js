import { useEffect, useState } from "react";

export default function useResolveQuery(query) {
  const queryPath = `/api/films?${query}`;

  const [resolvedQuery, setResolvedQuery] = useState([]);

  useEffect(() => {
    try {
      if (query) {
        const resolveQuery = async () => {
          const res = await fetch(queryPath);

          if (!res.ok) {
            throw new Error(`Could not complete query: ${query}`);
          }

          const data = await res.json();
          setResolvedQuery(data);
        };
        resolveQuery();
      }
    } catch (err) {
      setResolvedQuery([]);
    }
  }, [query]);

  return resolvedQuery;
}
