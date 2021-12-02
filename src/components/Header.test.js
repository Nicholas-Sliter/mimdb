import Header from "./Header";
import { screen, fireEvent, render } from "@testing-library/react";


describe("Header tests", () => {

   it("should render the Header component", () => {
      render(<Header />);
      const header = screen.getByRole("banner");
      expect(header).toBeInTheDocument();
   });

   it("should show the hamburger menu when the screenwidth is small", () => {
      window = Object.assign(window, { innerWidth: 500 });
      render(<Header />);
     
      //get by test id
      const hamburger = screen.getByTestId("Menu-Button");
      expect(hamburger).toBeInTheDocument();

   });

});
