import { useState } from "react"

export default function Featured({ collection }) {
    const [featuredFilms, setFeatured] = useState()

    const getFeatured = () => {
        let random1
        let random2
        let random3

        while(random1 == random2 || random1 == random3 || random2 == random3) {
            random1 = Math.randomInt(1, collection.length)
            random2 = Math.randomInt(1, collection.length)
            random3 = Math.randomInt(1, collection.length)
        }

        const movie1 = collection.find(movie => movie.id == random1)
        const movie2 = collection.find(movie => movie.id == random2)
        const movie3 = collection.find(movie => movie.id == random3)

        setFeatured([movie1, movie2, movie3])
    }

    return (
    <div>
        <div>{featuredFilms[0]}</div>
        <div>{featuredFilms[1]}</div>
        <div>{featuredFilms[1]}</div>
    </div>
    )
}