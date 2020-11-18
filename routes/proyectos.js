const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const proyectoControllers = require("../controllers/proyectoControllers");
const auth = require("../middleware/auth");

router.post(
  "/",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  proyectoControllers.crearProyecto
);

router.get("/", auth, proyectoControllers.obtenerProyectos);

router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  proyectoControllers.actualizarProyecto
);

router.delete(
  "/:id",
  auth,
  proyectoControllers.eliminarProyecto
);

module.exports = router;
