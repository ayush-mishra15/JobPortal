import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
  if (!file || !file.originalname || !file.buffer) {
    console.warn("⚠️ File is missing or incomplete in getDataUri");
    return null; // or throw custom error
  }

  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};

export default getDataUri;
