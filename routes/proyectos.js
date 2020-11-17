const express = require("express");
const router = express.Router();
const proyectoControllers = require("../controllers/proyectoControllers");

router.post("/", proyectoControllers.crearProyecto);

module.exports = router;
