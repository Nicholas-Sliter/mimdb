import SingleFilmDisplay from "./SingleFilmDisplay";
import { screen, render } from "@testing-library/react";

    const movie = {
		backdrop_path: "/filmImages/sp_backdrop.jpg",
		genre: [
			"Animation"
		],
		id: 1,
		slug: "spider-man-into-the-spider-verse",
		overview: "Miles Morales is juggling his life between being a high school student and being a spider-man. When Wilson \"Kingpin\" Fisk uses a super collider, others from across the Spider-Verse are transported to this dimension.",
		description: "A short one-sentence explanation of the film.",
		poster_path: "/filmImages/sp_poster.jpg",
		release_date: "2018-12-06",
		term: "F21",
		title: "Spider-Man: Into the Spider-Verse",
		video: false,
		vimeo_id: "607602408",
		course: [
			"Sight and Sound"
		],
		course_CRNs: [
			"FMMC 0105"
		],
		directors: [
			"Wayne Wang",
			"Nicholas Sliter"
		],
		director_ids: [
			1,
			2
		],
		directors_slugs: [
			"wayne-wang",
			"nicholas-sliter"
		],
		actors: [
			"Nicholas Sliter",
			"Jiaqi Li",
			"Wayne Wang",
			"Becca Hochman-Fisher",
			"Nicholas McKalip",
			"Katie Kosior"
		],
		contributors: [
            "Nicholas Sliter",
            "Jiaqi Li",
            "Wayne Wang",
            "Becca Hochman-Fisher",
            "Nicholas McKalip",
            "Katie Kosior"],
		duration: "142 min",
		approved: false
	}

    describe.skip("Single Film Display Tests", () => {
        // eslint-disable-next-line no-unused-vars
        let selectFunction;
        
    
        test("Layout", async () => {
        selectFunction = jest.fn();
    
          render(<SingleFilmDisplay film={movie}/>);
            
          expect(screen.getByTestId("filmTitle").textContent).toBe(movie.title);

          expect(screen.getByTestId("filmCourse").textContent).toBe(movie.course[0]);
            
          expect(screen.getByTestId("filmTerm").textContent).toBe(`Term: ${movie.term}`);

          expect(screen.getByTestId("filmGenre").textContent).toBe(movie.genre.join(", "));
    
          expect(screen.getByTestId("filmDur").textContent).toBe(movie.duration);

          expect(screen.getByTestId("filmDir").textContent).toBe(movie.directors.join(""));

          expect(screen.getByTestId("filmOver").textContent).toBe(movie.overview);

          expect(screen.getByTestId("filmActors").textContent).toBe(movie.actors.join(""));

          expect(screen.getByTestId("filmContrib").textContent).toBe(movie.contributors.join(""));


          });  
    })