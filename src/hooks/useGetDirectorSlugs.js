import { useEffect, useState } from "react";

// get an array of director slugs from /api/films/[slug]/directors

export default function useGetDirectorSlugs(slug) {
  const [directors, setDirectors] = useState([]);

  async function fetchDirectors() {
    // eslint-disable-next-line
    const response = await fetch(`/api/films/${slug}/directors`);
    if (!response.ok) {
      throw new Error(`Unable to fetch director url slugs with film: ${slug}`);
    }
    const slugObjects = await response.json();
    const slugs = slugObjects.map((slugObject) => slugObject.director_slug);
    setDirectors(slugs);
  }

  useEffect(() => {
    fetchDirectors();
  }, [slug]);

  return directors;
}
