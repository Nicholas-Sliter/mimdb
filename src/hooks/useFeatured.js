import { useEffect, useState } from "react";

export default function Featured({ collection, number }) {
    const [featuredFilms, setFeatured] = useState([])

    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    // numWanted is an integer parameter for how many random films need to be generated
    function getFeatured(numWanted) {
        let collectionCopy = collection.map((movie) => ({...movie}));
        //console.log(collectionCopy[0]);

        collectionCopy = shuffleArray(collectionCopy);

        const featured = collectionCopy.slice(0, Math.min(numWanted, collection.length))
        setFeatured(featured)
    }

    //useEffect(() => getFeatured(3), [])

   useEffect(() => getFeatured(number), [])
   //getFeatured(number)


    return featuredFilms
}