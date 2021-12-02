import DirectorPage from "./DirectorPage";
import { screen, render } from "@testing-library/react";

    const director =
        {
        director_name: "Wayne Wang",
        director_id: 1,
        director_bio: "I'm actually a programmer.",
        director_midd_email: "midd@middlebury.edu",
        director_personal_email: "personal@domain.com",
        director_graduation_year: "2022.5"
    }
    


describe("Director Page Tests", () => {
    // eslint-disable-next-line no-unused-vars
    let selectFunction;
    

    test.only("Director Info", async () => {
    selectFunction = jest.fn();

      render(<DirectorPage film director={director}/>);

      expect(screen.getByTestId("directorPageName").textContent).toBe(director.director_name);

      expect(screen.getByTestId("directorBio").textContent).toBe(director.director_bio);

      expect(screen.getByTestId("directorMiddEmail").textContent).toBe(director.director_midd_email);

      expect(screen.getByTestId("directorPerseEmail").textContent).toBe(director.director_personal_email);

      expect(screen.getByTestId("directorPerseEmail").textContent).toBe(director.director_personal_email);



      });  
})
