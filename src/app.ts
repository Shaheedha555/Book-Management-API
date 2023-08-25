import express from "express";
import connection from "./db/config";
import dotenv from "dotenv";
dotenv.config();
import { json, urlencoded } from "body-parser";
import { router } from "./router/book";
const app = express();
const PORT = process.env.PORT || 4000;
app.use(json());

app.use(urlencoded({ extended: true }));

app.use("/book", router);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);
connection
  .sync()
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
