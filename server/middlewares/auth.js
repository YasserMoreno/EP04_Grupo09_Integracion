require('dotenv').config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.VALIDATE_KEY;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ error: "Token no proporcionado" });
  }

  if (!secretKey) {
    return res.status(500).send({ error: "Clave secreta para JWT no encontrada en .env" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.error("Error al verificar el token:", err);
      return res.status(403).send({ error: "Token inválido o expirado" });
    }

    req.userId = user.id;
    next();
  });
};

module.exports = authenticateToken;