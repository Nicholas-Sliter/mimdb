import films from "../../data/tempData.json";
import directors from "../../data/tempDirectors.json";
import courses from "../../data/tempCourses.json";


import {
    knex,
    getGenres,
    getDirectors,
    getAllGenres,
    getAllCourses,
    getAllFilms,
    getFilmById,
    getFilmBySlug,
    getFilmsByCourse,
    getFilmsByGenre,
    addFilm,
    updateFilmApproval
} from "./backend-utils";

describe("Tests of database Film Table utility functions", () => {
    let sampleFilm, allGenres, allCourses, dramaFilms, sightFilms;
    let properties;

    beforeAll(async () => {
        sampleFilm = films[0];
        sampleFilm = (({ director_ids, course_CRNs, directors_slugs, ...rest }) => ({ rest }))(sampleFilm);
        sampleFilm = sampleFilm.rest;
        // boolean false and true gets turned into 0 and 1 by postgresSQL functions
        sampleFilm.video = sampleFilm.video === false ? 0 : 1;
        sampleFilm.approved = sampleFilm.approved === false? 0 : 1;

        let set = new Set(films.map((film) => film.genre).flat());
        allGenres = [...set];

        set = new Set(films.map((film) => film.course).flat());
        allCourses = [...set];

        dramaFilms = films.filter((film) => film.genre.includes("Drama"));
        dramaFilms = dramaFilms.map((film) => ({ film_id: film.id }));

        sightFilms = films.filter((film) => film.course.includes("Sight and Sound"));
        sightFilms = sightFilms.map((film) => ({ film_id: film.id }));

        properties = Object.keys(sampleFilm).filter((key) => key !== "course_CRNs" && key !== "director_ids");
    });


    beforeEach(async () => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
        await knex.seed.run();
    });


    test("getGenres: fetches the correct genres for a film", async () => {
        const testGenres = await getGenres(sampleFilm.id);

        expect(testGenres.length).toBe(sampleFilm.genre.length);
        expect(testGenres).toEqual(expect.arrayContaining(sampleFilm.genre));
    });

    test("getDirectors: fetches the correct directors for a film", async () => {
        const testDirectors = await getDirectors(sampleFilm.id);

        expect(testDirectors.length).toBe(sampleFilm.directors.length);
        expect(testDirectors).toEqual(expect.arrayContaining(sampleFilm.directors));
    });

    test("getAllGenres: fetches all the genres", async () => {
        const testAllGenres = await getAllGenres();

        expect(testAllGenres.length).toBe(allGenres.length);
        expect(testAllGenres).toEqual(expect.arrayContaining(allGenres));
    });

    test("getAllCourses: fetches all the courses", async () => {
        const testAllCourses = await getAllCourses();

        expect(testAllCourses.length).toBe(allCourses.length);
        expect(testAllCourses).toEqual(expect.arrayContaining(allCourses));
    });

    test("getFilmById: fetches the correct film by film id", async () => {
        const film = await getFilmById(sampleFilm.id);

        expect(film.title).toBe(sampleFilm.title);
        expect(film.overview).toBe(sampleFilm.overview);
        expect(film.slug).toBe(sampleFilm.slug);

    });

    test("getFilmBySlug: fetches film by film slug", async () => {
        const film = await getFilmBySlug(sampleFilm.slug);

        expect(film.title).toBe(sampleFilm.title);
        expect(film.overview).toBe(sampleFilm.overview);
        expect(film.id).toBe(sampleFilm.id);

    });

    test("getFilmsByGenre: fetches all films from genre drama", async () => {
        const testDramaFilms = await getFilmsByGenre("Drama");

        expect(testDramaFilms.length).toBe(dramaFilms.length);
        expect(testDramaFilms).toEqual(expect.arrayContaining(dramaFilms));
    });

    test("getFilmsByCourse: fetches all films from course sight and sound", async () => {
        const testSightFilms = await getFilmsByCourse("Sight and Sound");

        expect(testSightFilms.length).toBe(sightFilms.length);
        expect(testSightFilms).toEqual(expect.arrayContaining(sightFilms));
    });

    test("getAllFilms: fetches all films", async () => {

        const fetchedFilms = await getAllFilms();

        expect(fetchedFilms).toHaveLength(films.length);
        const testFilm = fetchedFilms.find((film) => film.id === sampleFilm.id);
        expect(testFilm).toEqual(sampleFilm);
        properties.forEach((prop) => { expect(fetchedFilms[0]).toHaveProperty(prop) });
    });


    test("addFilm: add film into database", async () => {
        const testNewFilm = {
            "overview": "Testing Overview",
            "description": "Testing Description",
            "poster_path": "",
            "backdrop_path": "",
            "release_date": "2021-11-17",
            "title": "Test Title",
            "vimeo_id": "607602408",
            "duration": "142 min",
            "term": "F21",
            "slug": "playing_around_in_cs"
        };

        const newFilm = await addFilm(testNewFilm);

        expect(newFilm).toBeTruthy();
        const filmFromDatabase = await getFilmById(newFilm.id);

        expect(filmFromDatabase).toEqual(newFilm);

    });

    test("updateFilmApproval: updates the film", async ()=>{
        const newFilm = { ...sampleFilm, approved: 0 };

        const updated = await updateFilmApproval(newFilm.slug, newFilm.approved);

        expect(updated).toBeTruthy();
        const updatedFilm = await getFilmById(newFilm.id);

        expect(updatedFilm).toEqual(newFilm);

    });

    test("updateFilmApproval: returns false on bad id", async ()=>{
        const newFilm = { ...sampleFilm, approved: 0 };

        const updated = await updateFilmApproval("", newFilm.approved);

        expect(updated).toBeFalsy();
    });

});