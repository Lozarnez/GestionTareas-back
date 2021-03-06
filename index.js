const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/db");

// Crear servidor
const app = express();

// Conectar base de datos
conectarDB();

// Habilitar cors
app.use(cors());

// Habilitar express.json
app.use(express.json({ extended: true }));

// Configurar puerto del servidor
const port = process.env.port || 8080;

// Importar rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas"));

// Iniciar servidor
app.listen(port, '0.0.0.0', () => {
  console.log(`Server on port ${port}`);
});
