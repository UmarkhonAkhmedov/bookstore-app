import jwt from "jsonwebtoken";

const JWT_SECRET = "Xy7D!2kVl@z#MlQ8W^3oRn&tA3$ZnWy1";

const verifyAdminToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "invalid credientials" });
    }
    req.user = user;
    next();
  });
};

export { verifyAdminToken };
