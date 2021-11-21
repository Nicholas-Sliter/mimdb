import { render, screen, fireEvent } from "@testing-library/react";
import Submit from "./Submit";

describe("Submit: Submiter tests", () => {
  let article;
  const handler = jest.fn();

  beforeEach(() => {
    film = {
      title: "Title of sample film",
      logLine: "LogLine of the sample film",
      overview: "Overview of the sample film",
      
    };

    handler.mockReset();
  });


})