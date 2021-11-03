import { useEffect, useState } from "react"

export default function Featured({ collection }) {
    const [featuredFilms, setFeatured] = useState()

    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array
    }

    // numWanted is an integer parameter for how many random films need to be generated
    function getFeatured(numWanted) {
        let collectionCopy = collection.map((movie) => movie);

        collectionCopy = shuffleArray(collectionCopy);

        const featured = collectionCopy.slice(0, Math.min(numWanted + 1, collection.length))
        setFeatured(featured)
    }

    useEffect(() => getFeatured(), [])


    return featuredFilms
}