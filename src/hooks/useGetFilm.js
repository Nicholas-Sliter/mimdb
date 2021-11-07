import { useEffect, useState } from "react";

// get a film object from api endpoint at /api/films/[slug]

export default function useGetFilm(slug) {
    const [film, setFilm] = useState();

    useEffect(async()=> {
        const response = await fetch(`/api/films/${slug}`);
        if (!response.ok){
            throw new Error(`Unable to fetch film with slug: ${slug}`);
        }
        const film = await response.json();
        setFilm(film);
    }, [slug])

    return(film);
}