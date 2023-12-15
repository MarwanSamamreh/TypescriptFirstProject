import express, { Request, Response } from "express";
import readBooks from "../utils/readBooks";
import path from "path";
import fs from "fs";

const router = express.Router();

// GET all books or filter by search query
router.get("/", (req: Request, res: Response) => {
  const { query } = req.query;
  const booksData = readBooks();

  if (query) {
    const filteredBooks = booksData.filter((book) =>
      book.name.toLowerCase().includes((query as string).toLowerCase())
    );
    res.json(filteredBooks);
  } else {
    res.json(booksData);
  }
});

// GET book by ID
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const booksData = readBooks();
  const book = booksData.find((b) => b.id === Number(id));

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

// POST a new book with a unique ID
// POST a new book with a unique ID
router.post("/", (req: Request, res: Response) => {
  try {
    const { name, author, isbn } = req.body;

    if (
      !name ||
      typeof name !== "string" ||
      !author ||
      typeof author !== "string" ||
      !isbn ||
      typeof isbn !== "string"
    ) {
      return res
        .status(400)
        .json({ error: "Name, author, and ISBN must be non-empty strings" });
    }

    const booksData = readBooks();
    const newBook = {
      id: booksData.length + 1,
      name,
      author,
      isbn,
    };

    booksData.push(newBook);

    // Write updated data back to the file
    fs.writeFileSync(
      path.join(__dirname, "../data/books.json"),
      JSON.stringify(booksData, null, 2),
      "utf-8"
    );
    console.log(`New Book Added: ${JSON.stringify(newBook)}`);

    res.json(newBook);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

export default router;
