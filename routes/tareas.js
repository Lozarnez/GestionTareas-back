const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const tareaControllers = require("../controllers/tareaControllers");
const auth = require("../middleware/auth");

router.post(
  "/",
  auth,
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("proyecto", "El proyecto es obligatorio").not().isEmpty(),
  ],
  tareaControllers.crearTarea
);

router.get("/", auth, tareaControllers.obtenerTareas);

router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre de la tarea es obligatorio").not().isEmpty()],
  tareaControllers.actualizarTarea
);

router.delete("/:id", auth, tareaControllers.eliminarTarea);

module.exports = router;
