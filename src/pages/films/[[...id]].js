import { useRouter } from "next/router";

export default function Film({films}) {
    const router = useRouter();
    const {id} = router.query;

    let currFilm;
    if (id !== undefined) {
        currFilm = films.find( (film)=>film.id === parseInt(id));
    };

    console.log(currFilm);

    return <p>{id}</p>
}