const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

exports.crearTarea = async (req, res) => {
  // Revisar por errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const { proyecto } = req.body;

    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    // Verificar proyecto-usuario
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    // Crear tarea
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.obtenerTareas = async (req, res) => {
  try {
    const { proyecto } = req.query;

    const existeProyecto = await Proyecto.findById(proyecto).sort({ creado: -1});
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    // Verificar proyecto-usuario
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    // Obtener tareas por proyecto
    const tareas = await Tarea.find({ proyecto });
    res.json({ tareas });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.actualizarTarea = async (req, res) => {
  try {
    const { proyecto, nombre, estado } = req.body;

    const tareaExiste = await Tarea.findById(req.params.id);

    if (!tareaExiste) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }

    // Extraer proyecto
    const existeProyecto = await Proyecto.findById(proyecto);

    // Verificar proyecto-usuario
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    const nuevaTarea = {};

    nuevaTarea.nombre = nombre;
    nuevaTarea.estado = estado;

    //Guardar tarea
    tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, {
      new: true,
    });

    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.eliminarTarea = async (req, res) => {
  try {
    const { proyecto } = req.query;

    const tareaExiste = await Tarea.findById(req.params.id);

    if (!tareaExiste) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }

    // Extraer proyecto
    const existeProyecto = await Proyecto.findById(proyecto);

    // Verificar proyecto-usuario
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    // Eliminar tarea
    await Tarea.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Tarea eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
