const express = require("express"); // Importamos express
const router = express.Router();// Creamos un router para manejar las rutas
const path = require("path"); // Importamos el módulo path para manejar rutas de archivos

// Definimos la ruta de las vistas
const views = path.join(__dirname, "/../views");

// Importamos el middleware isLoggedIn para verificar si el usuario está autenticado
const isLoggedIn = require("../middlewares/isLoggedIn");

// Definimos las rutas para servir los archivos HTML
// Ruta para la página principal, protegida por el middleware isLoggedIn
router.get("/", isLoggedIn, (req, res) => {
  res.sendFile(views + "/index.html");
});

// Ruta para la página de registro, no protegida por el middleware
router.get("/register", (req, res) => {
  res.sendFile(views + "/register.html");
});

module.exports = router;