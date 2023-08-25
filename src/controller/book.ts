import { RequestHandler } from "express";

import { Books } from "../model/book";

export const createBook: RequestHandler = async (req, res, next) => {
  const { title, author, publishedYear } = req.body;
  if (!title || !author === null) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (typeof publishedYear != "number") {
    console.log(typeof publishedYear);

    return res.status(400).json({ error: "Year should be valid" });
  }
  var books = await Books.create({ title, author, publishedYear });
  return res
    .status(200)
    .json({ message: "Book created successfully", data: books });
};

export const deleteBook: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const deletedBook: Books | null = await Books.findByPk(id);
  if (Books.length < 1)
    return res.status(200).json("No book found in the given id");
  await Books.destroy({ where: { id } });
  return res
    .status(200)
    .json({ message: "Book deleted successfully", data: deletedBook });
};

export const getAllBook: RequestHandler = async (req, res, next) => {
  const allBooks: Books[] = await Books.findAll();

  if (allBooks.length < 1) return res.status(200).json("No books found");
  return res
    .status(200)
    .json({ message: "Book fetched successfully", data: allBooks });
};

export const getBookById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const books: Books | null = await Books.findByPk(id);
  if (!books) return res.status(400).json("No book found in the given id");
  return res
    .status(200)
    .json({ message: "Book fetched successfully", data: books });
};

export const updateBook: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const { title, author, publishedYear } = req.body;
  if (!title && !author && !publishedYear) {
    return res.status(400).json({ error: "Missing contents to update" });
  }
  const books: Books | null = await Books.findByPk(id);
  if (!books) return res.status(400).json("No book found in the given id");

  await Books.update({ ...req.body }, { where: { id } });
  const updatedBooks: Books | null = await Books.findByPk(id);
  return res
    .status(200)
    .json({ message: "Book updated successfully", data: updatedBooks });
};
