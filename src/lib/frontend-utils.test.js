//jest tests for frontend-utils.js
import { convertToSlug } from "./frontend-utils.js";

//convert to slug tests
describe("convertToSlug", function () {
  it("should convert to slug", function () {
    expect(convertToSlug("This is a test")).toBe("this-is-a-test");
  });
  it("should handle empty strings", function () {
    expect(convertToSlug("")).toBe("");
  });
  it("should handle single spaces", function () {
    expect(convertToSlug(" ")).toBe("");
  });
  it("should handle null", function () {
    expect(convertToSlug(null)).toBe("");
  });
  it("should handle undefined", function () {
    expect(convertToSlug(undefined)).toBe("");
  });
});
