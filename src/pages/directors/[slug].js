import DirectorPage from "../../components/DirectorPage";
import Layout from "../../components/Layouts/Layout";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";

export default function Director({ genres, courses }) {
  const router = useRouter();
  const { slug } = router.query;

  //const directorName = decodeURIComponent(director)

  const [directorInfo, setDirectorInfo] = useState(null);
  const [directorFilms, setDirectorFilms] = useState([]);

  const getDirectorFilms = async () => {
    const response = await fetch(`/api/directors/${slug}/films`);

    if (!response.ok) {
      throw new Error(`Failed to fetch films by ${slug}`);
    }
    
    const data = await response.json();
    console.log(data);
    setDirectorFilms(data);
  };

  const getDirectorInfo = async () => {
    if (!slug) {
      return;
    }
    const res = await fetch(`/api/directors/${slug}`);
    if (!res.ok) {
      console.error(`Failed to fetch director ${slug}`);
    }
    const data = await res.json();
    setDirectorInfo(data);
  };

  useEffect(() => {
    getDirectorFilms();
    getDirectorInfo();
  }, [slug]);

  return (
    <Layout>
      {(directorInfo) ? (
          <DirectorPage films={directorFilms} director={directorInfo} />
        ) : null}
    </Layout>
  );
}
