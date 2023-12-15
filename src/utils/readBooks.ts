import fs from "fs";
import path from "path";

const readBooks = (): any[] => {
  const filePath = path.join(__dirname, "../data/books.json");
  if (!fs.existsSync(filePath)) {
    console.error("Books file does not exist.");
    return [];
  }

  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading books file:", error);
    return [];
  }
};

export default readBooks;
