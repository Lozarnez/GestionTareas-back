const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const authControllers = require("../controllers/authControllers");

router.post(
  "/",
  [
    check("email", "Agrega un email valido").isEmail(),
    check("password", "El password debe ser minimo de 6 caracteres").isLength({
      min: 6,
    }),
  ],
  authControllers.autenticarUsuario
);

module.exports = router;
