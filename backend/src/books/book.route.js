import express from "express";
import {
  deleteBook,
  getAllBooks,
  getSingleBook,
  postBook,
  updateBook,
} from "./book.controller.js";
import { verifyAdminToken } from "../middleware/verifyAdminToken.js";

const router = express.Router();

router.post("/create-book", verifyAdminToken, postBook);
router.get("/", getAllBooks);
router.get("/:id", getSingleBook);
router.put("/edit/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
