const express = require("express");
const conectarDB = require("./config/db");

// Crear servidor
const app = express();

// Conectar base de datos
conectarDB();

// Habilitar express.json
app.use(express.json({ extended: true }));

// Configurar puerto del servidor
const PORT = process.env.PORT || 8080;

// Importar rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
