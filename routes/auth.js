const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const authControllers = require("../controllers/authControllers");
const auth = require('../middleware/auth');

router.post(
  "/",
  authControllers.autenticarUsuario
);

router.get("/", auth, authControllers.usuarioAutenticado);

module.exports = router;
