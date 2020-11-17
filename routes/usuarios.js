const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const usuarioControllers = require('../controllers/usuarioControllers');

router.post ('/',
  [
    check('nombre', 'Elnombre es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email valido').isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 })
  ],
  usuarioControllers.crearUsuario
);

module.exports = router;