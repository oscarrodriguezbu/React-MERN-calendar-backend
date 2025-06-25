const path = require("path");

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio Público
app.use(express.static("public")); //use es un middleware, es una funcion que se ejecuta siempre que pase por algun lugar

// Lectura y parseo del body
app.use(express.json()); //express ya viene listo para parsear el body. Esto se encarga de revisir la data que se envia en los endpoints

// Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

app.use("*", (req, res) => {//se adiciona configuracion para que la url del frontend no se bugueé en produccion con las urls
  //siempre necesita una respuesta
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.info(`Servidor corriendo en puerto ${process.env.PORT}`);
});
