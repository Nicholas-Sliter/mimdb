import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Submit from "./Submit";
import fetchMock from "fetch-mock-jest";

jest.mock("next/router");

describe("Submit: Submitter tests", () => {
    let container;
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
      ({ container } = render(<Submit />));

      // wait for updates
      await act(async () => {
        await fetchMock.flush();
      });
    })

    const createNewFilm = async (action) => {
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

      const button = screen.queryByRole("button", { name: action });
      fireEvent.click(button);
      await act(async () => {
        await fetchMock.flush();
      });
    };

    test.only("Submit button posts new film", async () => {
      await createNewFilm("Save")

      const callData = fetchMock.lastCall(`/api/films`);
      expect(callData).not.toBeUndefined();
      expect(callData[1].method).toBe("POST");

      const payload = JSON.parse(callData[1].body);

      expect(payload.title).toBe(film.title);
      expect(payload.logLine).toBe(film.logLine);
      expect(payload.release_date).toBe(film.release_date);
      expect(payload.duration).toBe(film.duration);
      expect(payload.courseId).toBe(film.courseId);
      expect(payload.vimeoId).toBe(film.vimeoId);
      expect(payload.overview).toBe(film.overview);
    });
  })