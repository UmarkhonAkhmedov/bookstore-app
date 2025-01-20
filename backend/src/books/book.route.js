import express from "express";
import {
  deleteBook,
  getAllBooks,
  getSingleBook,
  postBook,
  updateBook,
} from "./book.controller.js";

const router = express.Router();

router.post("/create-book", postBook);
router.get("/", getAllBooks);
router.get("/:id", getSingleBook);
router.put("/edit/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
