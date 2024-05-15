import jwt from "jsonwebtoken";

const authorize = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({ message: "No token provided." });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Aquí se verifica si el role_id del usuario está incluido en los roles permitidos
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Failed to authenticate token." });
    }
  };
};

export default authorize;
