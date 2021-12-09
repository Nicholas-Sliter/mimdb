import { createMocks } from "node-mocks-http";
import handler from "../pages/api/directors/[slug]/index";

describe.skip("getDirectorAPI", () => {
   it("should return a director when given a valid slug", async () => {
      const { req, res } = createMocks({
         method: "GET",
         url: `/api/directors/${director-slug}`,
      });

      const result = await handler(req, res);

      expect(res._isEndCalled()).toBeTruthy();
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toMatchObject({});

   });
});