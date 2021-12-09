import { screen, render } from "@testing-library/react";
import FilmController from "./FilmController";
//import testData from "../../../data/testData.json";

//props for film controller
const title = "FilmsTest";
const queryObj = {
  genre: "",
  course: "",
  term: "",
};
const rowStyleObject = {
  displayType: "small",
  wrap: true,
};


describe.skip("FilmController: Basic UI Tests", () => {
  //it should render
  it("should render", () => {
    render(
      <FilmController
        title={title}
        queryObj={queryObj}
        rowStyleObject={rowStyleObject}
      />
    );
  });

  //it should render the title
  it("should render the title", () => {
    render(
      <FilmController
        title={title}
        queryObj={queryObj}
        rowStyleObject={rowStyleObject}
      />
    );
    expect(screen.getByText(title)).toBeInTheDocument();
  });
});


describe ("FilmController: Query Functionality Tests", () => {


});