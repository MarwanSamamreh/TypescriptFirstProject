"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const readBooks_1 = __importDefault(require("../utils/readBooks"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
// GET all books or filter by search query
router.get("/", (req, res) => {
    const { query } = req.query;
    const booksData = (0, readBooks_1.default)();
    if (query) {
        const filteredBooks = booksData.filter((book) => book.name.toLowerCase().includes(query.toLowerCase()));
        res.json(filteredBooks);
    }
    else {
        res.json(booksData);
    }
});
// GET book by ID
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const booksData = (0, readBooks_1.default)();
    const book = booksData.find((b) => b.id === Number(id));
    if (book) {
        res.json(book);
    }
    else {
        res.status(404).json({ error: "Book not found" });
    }
});
// POST a new book with a unique ID
// POST a new book with a unique ID
router.post("/", (req, res) => {
    try {
        const { name, author, isbn } = req.body;
        if (!name ||
            typeof name !== "string" ||
            !author ||
            typeof author !== "string" ||
            !isbn ||
            typeof isbn !== "string") {
            return res
                .status(400)
                .json({ error: "Name, author, and ISBN must be non-empty strings" });
        }
        const booksData = (0, readBooks_1.default)();
        const newBook = {
            id: booksData.length + 1,
            name,
            author,
            isbn,
        };
        booksData.push(newBook);
        // Write updated data back to the file
        fs_1.default.writeFileSync(path_1.default.join(__dirname, "../data/books.json"), JSON.stringify(booksData, null, 2), "utf-8");
        console.log(`Books Data After Update: ${JSON.stringify(newBook)}`);
        res.json(newBook);
    }
    catch (error) {
        console.log(`Error: ${error}`);
    }
});
exports.default = router;
