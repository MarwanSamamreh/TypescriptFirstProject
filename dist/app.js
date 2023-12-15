"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const books_1 = __importDefault(require("./routes/books"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use("/books", books_1.default);
app.use((err, req, res, next) => {
    console.error(err);
    if (err instanceof SyntaxError) {
        return res.status(400).json({ error: "Invalid JSON syntax" });
    }
    res.status(500).json({ error: "Internal Server Error" });
});
app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
