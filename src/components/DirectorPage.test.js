import DirectorPage from "./DirectorPage";
import { screen, fireEvent, render } from "@testing-library/react";
import { movies } from "../lib/test-utils"

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

    

    test.only("Director Info", async () => {
    let selectFunction = jest.fn();

      render(<DirectorPage film director={director}/>);

      const nameShown = await screen.findAllByTestId("directorPageName");
      expect(nameShown).toEqual(director.director_name);

      const bioShown = await screen.findAllByTestId("directorBio");
      expect(bioShown).toEqual(director.director_bio);

      const middEmailShown = await screen.findAllByTestId("directorMiddEmail");
      expect(middEmailShown).toEqual(director.director_midd_email);

      const persEmailShown = await screen.findAllByTestId("directorPerseEmail");
      expect(persEmailShown).toEqual(director.director_personal_email);

      const classYearShown = await screen.findAllByTestId("directorClassYearShown");
      expect(classYearShown).toEqual(director.director_graduation_year);


      });  
})