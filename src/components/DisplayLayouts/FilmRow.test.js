import { screen, render } from "@testing-library/react";
import FilmRow from "./FilmRow";

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

const testTitle= "Animation";

describe("Filmrow: Filmrow initialization", () => {
    test("Filmrow: Handles empty films without error", () => {
      render(<FilmRow films={[]} title={"haha"} />);
    });
  });


describe("Film Row Tests", () => {

    test("Title of Row Shows Up", async () => {

        render(<FilmRow films={testFilms} title={testTitle} />);
        const titleShown = await screen.findAllByTestId("title");
        expect(titleShown[0].innerHTML).toEqual(testTitle);

    });

    test("Test small card displays", async() => {

        render(<FilmRow films={testFilms} title={testTitle} />);
        const showSmall = await screen.findAllByTestId("smallTestCard");
        expect(showSmall[0]).toBeVisible();
        expect(showSmall[1]).toBeVisible();
    })

    test("Test wide card displays", async() => {

        render(<FilmRow films={testFilms} title={testTitle} displayType="wide"/>);
        const showWide = await screen.findAllByTestId("wideTestCard");
        expect(showWide[0]).toBeVisible();
        expect(showWide[1]).toBeVisible();
    })
});