import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const tokenHeader = req.headers.authorization || req.headers.Authorization;

  if (!tokenHeader || !tokenHeader?.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Missing or invalid token" });
  }

  const token = tokenHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, data) => {
    if (error) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    } else {
      req.user = data.user;
      next();
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res
        .status(401)
        .json({ message: "Unauthorized: Insufficient permissions" });
    }
  });
};

export { verifyAdmin, verifyToken };
