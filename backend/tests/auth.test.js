const request = require("supertest");

describe("Backend Running Test", () => {

  test("GET / should return running message", async () => {
    const res = await request("http://localhost:5000").get("/");
    expect(res.statusCode).toBe(200);
  });

  test("GET /api/courses should return array", async () => {
    const res = await request("http://localhost:5000").get("/api/courses");
    expect(Array.isArray(res.body)).toBe(true);
  });

});
