const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //Leer el token
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Permiso no válido" });
  }

  // Validar token
  try {
    const cifrado = jwt.verify(token, process.env.SECRETA);
    req.usuario = cifrado.usuario;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token no válido" });
  }
};
