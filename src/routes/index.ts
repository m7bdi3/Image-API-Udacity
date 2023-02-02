import fs from "fs";
import path from "path";
import express from "express";
import { imageFunction1, imageFunction2 } from "./api/processingImages";

const routes = express.Router();

class pathFolder {
  static imageFullDir = path.resolve("../../Images/full");
  static imageThumbDir = path.resolve("../../Images/thumb");
}

routes.get("/images", async (request, response) => {
  try {
    const filename = request.query.filename;
    const width = Number(request.query.width);
    const height = Number(request.query.height);

    const imageThumb1 =
      path.join(
        __dirname,
        "../",
        "../",
        "Images/",
        "thumb/",
        filename as string
      ) + `-${width}-${height}.jpg`;
    const imageThumb2 =
      path.join(
        __dirname,
        "../",
        "../",
        "Images/",
        "thumb/",
        filename as string
      ) + `jpg`;
    if (fs.existsSync(imageThumb1)) {
      response.sendFile(imageThumb1);
    } else {
      const imageProcess1 = await imageFunction1(
        filename as string,
        width,
        height
      );
      response.sendFile(imageProcess1);
    }

    if (fs.existsSync(imageThumb2)) {
      response.sendFile(imageThumb2);
    } else {
      const imageProcess2 = await imageFunction2(filename as string);
      response.sendFile(imageProcess2);
    }
  } catch (error) {
    response.status(404).send(`Error processing image: ${error}`);
  }
});

export { routes, pathFolder };
