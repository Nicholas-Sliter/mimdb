import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Submit from "./Submit";
//import fetchMock from "fetch-mock-jest";

jest.mock("next/router");

describe("Submit: Submitter tests", () => {
  const handler = jest.fn();
    //let container;
    const film = {
            title: "sample",
            logLine: "LogLine of the sample film",
            release_date: "F21",
            duration: "90",
            courseId: "CSCI0312",
            vimeoId: "vimeoId",
            overview: "Overview of the sample film"
    };

    beforeEach( async () => {

      handler.mockReset();
      
    })


    

    test.only("Submit button posts new film", async () => {
      const { container } = render(<Submit complete={handler}/>);

      const titleEditor = container.querySelector("input[type=text]", {name: "title"});
        const logLineEditor = container.querySelector("input[type=text", {name: "logLine"});
        const dateEditor = container.querySelector("input[type=text", {name: "semester"});
        const durationEditor = container.querySelector("input[type=text", {name: "duration"});
        const courseIdEditor = container.querySelector("input[type=text", {name: "courseId"});
        const vimeoIdEditor = container.querySelector("input[type=text", {name: "vimeoId"})
        const overviewEditor = container.querySelector("textarea");
  
        fireEvent.change(titleEditor, {
          target: { value: film.title },
        });
        fireEvent.change(logLineEditor, {
          target: { value: film.logLine },
        });
        fireEvent.change(dateEditor, {
          target: { value: film.release_date },
        });
        fireEvent.change(durationEditor, {
          target: { value: film.duration },
        });
        fireEvent.change(courseIdEditor, {
          target: { value: film.courseId },
        });
        fireEvent.change(vimeoIdEditor, {
          target: { value: film.vimeoId },
        });
        fireEvent.change(overviewEditor, {
          target: { value: film.overview },
        });
  
        const button = screen.getByRole("button", { name: "Submit" });
        fireEvent.click(container, button);

      expect(handler).toHaveBeenCalled();

      const newFilm = handler.mock.calls[0][0]; // value the handler was called with

      expect(newFilm.title).toEqual(film.title);
      expect(newFilm.overview).toEqual(film.logLine);
    });
  })