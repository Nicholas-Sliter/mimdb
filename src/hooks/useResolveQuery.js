import { useEffect, useState } from "react";

export default function useResolveQuery(query) {
  const [resolvedQuery, setResolvedQuery] = useState([]);
  useEffect(() => {
    try {
      if (query) {
        const resolveQuery = async () => {
          const res = await fetch(query);

          if (!res.ok) {
            throw new Error(`Could not complete query: ${query}`);
          }

          const data = res.json();
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
