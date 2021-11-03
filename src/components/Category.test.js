import Category from "./Category";
import { screen, fireEvent, render } from "@testing-library/react";

import { genres } from "../lib/test-utils";

describe("Header tests", () => {
    let selectFunction;
  
    beforeEach(() => {
      selectFunction = jest.fn();
      render(<Category fieldName={"Genre"} fieldList={genres}/>);
    });
  
  
  
    test("Genres to display", async () => {
      const section = await screen.findByText("Genre");
  
      fireEvent.mouseOver(screen.getByText("Genre"));
  
      const genreShown = await screen.findAllByTestId("dropdown");
  
      expect(genreShown).toHaveLength(genres.length);
  
      genres.forEach((genre) => {
        expect(screen.getByText(genre)).toBeVisible();
      });
    })   
  });