import express from "express";
import bodyParser from "body-parser";
import booksRouter from "./routes/books";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/books", booksRouter);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err);

    if (err instanceof SyntaxError) {
      return res.status(400).json({ error: "Invalid JSON syntax" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
