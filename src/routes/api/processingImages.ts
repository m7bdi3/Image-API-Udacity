import path from "path";
import sharp from "sharp";
import fs from "fs";
import { promises as fsPromises } from "fs";

const imageFunction1 = async (
  filename: string,
  height: number,
  width: number
): Promise<string> => {
  const inputImage = path.resolve(
    __dirname,
    "../../Images/full",
    `${filename}.jpg`
  );
  const outputImageFolder = path.resolve(__dirname, "../../Images/thumb");
  const outputImage = path.resolve(
    outputImageFolder,
    `${filename}-${width}-${height}.jpg`
  );

  if (!fs.existsSync(outputImageFolder)) {
    await fsPromises.mkdir(outputImageFolder, { recursive: true });
  }

  try {
    await sharp(inputImage).resize(width, height).toFile(outputImage);
    return outputImage;
  } catch (error) {
    console.error(error);
    return "Error processing image";
  }
};

const imageFunction2 = async (filename: string): Promise<string> => {
  const inputImage = path.resolve(
    __dirname,
    "../../Images/full",
    `${filename}.jpg`
  );
  const outputImageFolder = path.resolve(__dirname, "../../Images/thumb");
  const outputImage = path.resolve(outputImageFolder, `${filename}.jpg`);

  if (!fs.existsSync(outputImageFolder)) {
    await fsPromises.mkdir(outputImageFolder, { recursive: true });
  }

  try {
    await sharp(inputImage).toFile(outputImage);
    return outputImage;
  } catch (error) {
    console.error(error);
    return "Error processing image";
  }
};

export { imageFunction1, imageFunction2 };
