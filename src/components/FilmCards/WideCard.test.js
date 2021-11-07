import { screen, render, fireEvent } from "@testing-library/react";
import WideCard from "./WideCard";

const testFilms = [{
    "backdrop_path": "/7d6EY00g1c39SGZOoCJ5Py9nNth.jpg",
    "genre": [
        "Animation"
    ],
    "id": 1,
    "slug": "spider-man-into-the-spider-verse",
    "language": [
        "en"
    ],
    "overview": "Miles Morales is juggling his life between being a high school student and being a spider-man. When Wilson \"Kingpin\" Fisk uses a super collider, others from across the Spider-Verse are transported to this dimension.",
    "description": "A short one-sentence explanation of the film.",
    "poster_path": "/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
    "release_date": "2018-12-06",
    "title": "Spider-Man: Into the Spider-Verse",
    "video": false,
    "vimeo_id": "12345678",
    "course": [
        "Television in the US"
    ],
    "directors": [
        "Wayne Wang"
    ],
    "actors": [
        "Nicholas Sliter",
        "Jiaqi Li",
        "Wayne Wang",
        "Becca Hochman-Fisher",
        "Nicholas McKalip",
        "Katie Kosior"
    ],
    "contributors": [],
    "duration": "142 min",
    "term": "F21"
},
{
    "backdrop_path": "/sQkRiQo3nLrQYMXZodDjNUJKHZV.jpg",
    "genre": [
        "Drama",
        "Sci-fi"
    ],
    "id": 2,
    "slug": "justice-league-dark-apokolips-war",
    "language": [
        "en"
    ],
    "overview": "Earth is decimated after intergalactic tyrant Darkseid has devastated the Justice League in a poorly executed war by the DC Super Heroes. Now the remaining bastions of good – the Justice League, Teen Titans, Suicide Squad and assorted others – must regroup, strategize and take the war to Darkseid in order to save the planet and its surviving inhabitants.",
    "description": "A short one-sentence explanation of the film.",
    "poster_path": "/c01Y4suApJ1Wic2xLmaq1QYcfoZ.jpg",
    "release_date": "2020-05-05",
    "title": "Justice League Dark: Apokolips War",
    "video": false,
    "vimeo_id": "12345678",
    "course": [
        "Film Theory"
    ],
    "directors": [
        "Wayne Wang"
    ],
    "actors": [
        "Nicholas Sliter",
        "Jiaqi Li",
        "Wayne Wang",
        "Becca Hochman-Fisher",
        "Nicholas McKalip",
        "Katie Kosior"
    ],
    "contributors": [],
    "duration": "142 min",
    "term": "F20"
}];

describe("WideCard: WideCard contents", ()=>{
    test("Film title shows up", async () =>{
        const { getByText } = render(<WideCard film={testFilms[0]}/>);
        expect(getByText(testFilms[0].title)).toBeInTheDocument();
        expect(getByText(testFilms[0].title)).toBeVisible();
    });

    test("Film duration shows up", async () => {
        const { getByText } = render(<WideCard film={testFilms[0]}/>);
        expect(getByText(testFilms[0].duration)).toBeInTheDocument();
        expect(getByText(testFilms[0].duration)).toBeVisible();
    });

    test("Film genre shows up", async () => {
        const { getByText } = render(<WideCard film={testFilms[0]}/>);
        expect(getByText(testFilms[0].genre)).toBeInTheDocument();
        expect(getByText(testFilms[0].genre)).toBeVisible();
    });

    test("Film description shows up", async () => {
        const { getByText } = render(<WideCard film={testFilms[0]}/>);
        expect(getByText(testFilms[0].description)).toBeInTheDocument();
        expect(getByText(testFilms[0].description)).toBeVisible();
    });

    test("Test wide poster displays", async() => {
        render(<WideCard film={testFilms[0]}/>);
        const showWidePoster = await screen.findAllByTestId("widePosterTest");
        expect(showWidePoster[0]).toBeVisible();
    });

})