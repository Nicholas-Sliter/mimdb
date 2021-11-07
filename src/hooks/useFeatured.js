
export default function useFeatured(films) {

    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // numWanted is an integer parameter for how many random films need to be generated
    function getFeatured(numWanted) {
        const collectionCopy = films.map((movie) => movie);

        shuffleArray(collectionCopy);

        const featured = collectionCopy.slice(0, Math.min(numWanted + 1, films.length));

        return featured;
    }
    return getFeatured(1);
}