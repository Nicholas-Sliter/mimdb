import Header from "./Header";
import { screen, fireEvent, render } from "@testing-library/react";

describe("Header render", () => {
    test("Handles empty array without error", () => {
      const handler = jest.fn();
      render(<Header collection={[]}/>);
    });

    test("logo and search bar render", () => {
        expect(screen.queryByRole("img")).toBeInTheDocument();
        expect(screen.queryByRole("input")).toBeInTheDocument();
      })
  });