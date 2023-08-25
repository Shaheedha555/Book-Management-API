import express from "express";

export const router = express.Router();

import {
  createBook,
  deleteBook,
  getAllBook,
  updateBook,
  getBookById,
} from "../controller/book";

router.post("/", createBook);

router.get("/", getAllBook);

router.get("/:id", getBookById);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);
