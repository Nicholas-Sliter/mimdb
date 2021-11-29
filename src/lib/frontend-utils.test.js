//jest tests for frontend-utils.js
import { convertToSlug } from "./frontend-utils.js";

//convert to slug tests
describe("convertToSlug", () => {
  it("should convert to slug", () => {
    expect(convertToSlug("This is a test")).toBe("this-is-a-test");
  });
  it("should handle empty strings", () => {
    expect(convertToSlug("")).toBe("");
  });
  it("should handle single spaces", () => {
    expect(convertToSlug(" ")).toBe("");
  });
  it("should handle null", () => {
    expect(convertToSlug(null)).toBe("");
  });
  it("should handle undefined", () => {
    expect(convertToSlug(undefined)).toBe("");
  });
});
