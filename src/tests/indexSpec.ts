import path from "path";
import { app } from "../index";
import supertest from "supertest";
import { imageFunction1, imageFunction2 } from "../routes/api/processingImages";

const request = supertest(app);

describe("Port test", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let server: any;
  beforeEach((done) => {
    //Testing another Port
    server = app.listen(5500, done);
  });

  afterEach((done) => {
    server.close(done);
  });

  it("should return 200 status code", async () => {
    const response = await supertest(app).get("/");
    expect(response.status).toEqual(200);
  });
});

describe("Testing The Endpoint", () => {
  it("Get the api/images endpoint and return a 404 error if the parameter is not set", async () => {
    const response = await supertest(app).get("/api/images");
    expect(response.status).toBe(404);
  });

  it("gets Response 200 if valid input arguments", async () => {
    const response = await request.get(
      "/api/images?filename=encenadaport&width=500&height=500"
    );
    expect(response.status).toBe(200);
  });

  it("returns 404 for invalid endpoint", async () => {
    const response = await request.get("/foo");
    expect(response.status).toBe(404);
  });
});

describe("Testing The Image Processing Function", () => {
  const filename = "encenadaport";
  const width = 300;
  const height = 300;

  it("Resize the image if the correct input parameters are specified in the URL", async () => {
    const response = await supertest(app).get(
      `/api/images?filename=${filename}&width=${width}&height=${height}`
    );
    expect(response.status).toBe(200);
  });

  it("Returns an error if the image to process does not exist or if an incorrect image name is entered.", async () => {
    const response = await request.get(
      `/api/images?filename=wrongname&width=${width}&height=${height}`
    );
    expect(response.status).toBe(404);
  });

  it("Returns an appropriate error message if the height or width is entered incorrectly", async () => {
    const response = await request.get(
      `/api/images?filename=${filename}&width=Wrongentry&height=Wrongentry`
    );
    expect(response.status).toBe(404);
  });
});

describe("processingImages1", () => {
  const filename = "encenadaport";
  const height = 100;
  const width = 200;

  it("processes an image and returns the output file path", async () => {
    const result = await imageFunction1(filename, height, width);
    expect(result).toBe(
      path.resolve(
        __dirname,
        "../Images/thumb",
        `${filename}-${width}-${height}.jpg`
      )
    );
  });
});

describe("processingImages2", () => {
  const filename = "encenadaport";

  it("processes an image and returns the output file path", async () => {
    const result = await imageFunction2(filename);
    expect(result).toBe(
      path.resolve(__dirname, "../Images/thumb", `${filename}.jpg`)
    );
  });
});
