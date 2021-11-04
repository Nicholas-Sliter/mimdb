import Category from "./Category";
import { screen, fireEvent, render } from "@testing-library/react";

import { classes, genre_ids } from "../lib/test-utils";

describe("Header tests", () => {
    // eslint-disable-next-line no-unused-vars
    let selectFunction;

    test("Genres to display", async () => {
    selectFunction = jest.fn();

      render(<Category fieldName={"Genre"} fieldList={genre_ids}/>);
      fireEvent.mouseOver(await screen.getByText("Genre"));
  
      const genreShown = await screen.findAllByTestId("dropdown");
  
      expect(genreShown).toHaveLength(genre_ids.length);
  
      genre_ids.forEach((genre) => {
        expect(screen.getByText(genre)).toBeVisible();
      });
    })   

    test("Classes to display", async () => {
        selectFunction = jest.fn();
    
          render(<Category fieldName={"Class"} fieldList={classes}/>);
          fireEvent.mouseOver(await screen.getByText("Class"));
      
          const genreShown = await screen.findAllByTestId("dropdown");
      
          expect(genreShown).toHaveLength(classes.length);
      
          classes.forEach((genre) => {
            expect(screen.getByText(genre)).toBeVisible();
          });
        })   
  });