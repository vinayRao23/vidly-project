import request from "supertest";
const app = require("../../app");

describe("/api/genres", () => {
  // beforeEach(() => {
  //   server = require("../../index");
  // });
  // afterEach(() => {
  //   server.close();
  // });
  // afterEach(() => {
  //   jest.clearAllMocks();
  //   jest.resetAllMocks();
  // });

  describe("GET /", () => {
    test("should return all genres", async () => {
      const response: request.Response = await request(app).get("/api/genres");
      expect(response.status).toBe(200);
    }, 30000);
  });
});
