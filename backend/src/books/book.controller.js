import { Book } from "./book.model.js";

const postBook = async (req, res) => {
  try {
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res
      .status(200)
      .send({ message: "Book posted successfully", book: newBook });
  } catch (error) {
    console.log("Error creating book", error);
    res.status(500).send({ message: "Failed to create book" });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    res.status(200).send(books);
  } catch (error) {
    console.log("Error fetching books", error);
    res.status(500).send({ message: "Failed to fetch books" });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).send({ message: "Book not Found!" });
    }

    res.status(200).send(book);
  } catch (error) {
    console.log("Error fetching book", error);
    res.status(500).send({ message: "Failed to fetch book" });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateBook) {
      res.status(404).send({ message: "Book is not Found!" });
    }
    res
      .status(200)
      .send({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    console.log("Error updating a book", error);
    res.status(500).send({ message: "Failed to update a book" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deleteBook) {
      res.status(404).send({ message: "Book is not Found!" });
    }
    res
      .status(200)
      .send({ message: "Book deleted successfully", book: deletedBook });
  } catch (error) {
    console.log("Error deleting a book", error);
    res.status(500).send({ message: "Failed to delete a book" });
  }
};

export { postBook, getAllBooks, getSingleBook, updateBook, deleteBook };
