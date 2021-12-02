//jest tests for frontend-utils.js
import { convertToSlug, buildQuery, decodeURIComponentSafe } from "./frontend-utils.js";

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
  it("should handle leading and trailing whitespace", () => {
    expect(convertToSlug("  This is a test  ")).toBe("this-is-a-test");
  });
});



describe("buildQuery", () => {
  it("should build a query string", () => {
    expect(buildQuery({
      "test": "test",
      "test2": "test2",
      "test3": "test3",
      "test4": "test4"
    })).toBe("test=test&test2=test2&test3=test3&test4=test4&");
  });
  it("should handle empty objects", () => {
    expect(buildQuery({})).toBe("");
  });
  it("should handle objects with empty values", () => {
    expect(buildQuery({
      "test": "",
      "test2": "",
      "test3": "",
      "test4": ""
    })).toBe("");
  });
  it("should handle objects with some empty values", () => {
    expect(buildQuery({
      "test": "test",
      "test2": "",
      "test3": "test3",
      "test4": ""
    })).toBe("test=test&test3=test3&");
  });
  it("should handle null", () => {
    expect(buildQuery(null)).toBe("");
  });
  it("should handle undefined", () => {
    expect(buildQuery(undefined)).toBe("");
  });
});


describe("decodeURIComponentSafe", () => {
  it("should decode a string", () => {
    expect(decodeURIComponentSafe("%20")).toBe(" ");
  });
  it("should handle empty strings", () => {
    expect(decodeURIComponentSafe("")).toBe("");
  });
  it("should handle null", () => {
    expect(decodeURIComponentSafe(null)).toBe("");
  });
  it("should handle undefined", () => {
    expect(decodeURIComponentSafe(undefined)).toBe("");
  });
  it("should handle malformed strings safely", () => {
    expect(decodeURIComponentSafe("%")).toBe("");
  });
});