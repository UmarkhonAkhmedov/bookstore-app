import express from "express";
import mongoose from "mongoose";
import bookRoutes from "../src/books/book.route.js";
import orderRoutes from "../src/orders/order.route.js";
import userRoutes from "../src/users/user.route.js";
import adminRoutes from "../src/stats/admin.stats.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://ua-bookstore.vercel.app"],
    credentials: true,
  })
);

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

async function main() {
  await mongoose.connect(process.env.DATABASE_URL);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
}

main()
  .then(() => console.log("MongoDB is running"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
