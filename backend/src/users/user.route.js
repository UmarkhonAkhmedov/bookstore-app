import express from "express";
import { User } from "./user.model.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const JWT_SECRET = "Xy7D!2kVl@z#MlQ8W^3oRn&tA3$ZnWy1";

if (!JWT_SECRET) {
  throw new Error(
    "JWT_SECRET_KEY is not defined in the environment variables."
  );
}

router.post("/admin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await User.findOne({ username });
    if (!admin) {
      res.status(404).send({ message: "Admin not found!" });
    }
    if (admin.password !== password) {
      res.status(401).send({ message: "invalid password!" });
    }
    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
        role: admin.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      message: "Authentication Successful",
      token: token,
      user: { username: admin.username, role: admin.role },
    });
  } catch (error) {
    console.error("Failed to login as admin", error);
    res.status(401).send({ message: "Failed to login as admin" });
  }
});

export default router;
