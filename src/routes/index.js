const express = require("express"); // Importamos express
const router = express.Router();// Creamos un router para manejar las rutas
const path = require("path"); // Importamos el módulo path para manejar rutas de archivos

// Definimos la ruta de las vistas
const views = path.join(__dirname, "/../views");

// Importamos el middleware isLoggedIn para verificar si el usuario está autenticado
const isLoggedIn = require("../middlewares/isLoggedIn");

// Ruta para la página principal, protegida por el middleware isLoggedIn
router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    res.sendFile(views + "/index.html");
  } catch (error) {
    // Si ocurre un error, lo pasamos al middleware de manejo de errores
    next(error);
  }
});

// Ruta para la página de registro, no protegida por el middleware
router.get("/register", async (req, res, next) => {
  try {
    res.sendFile(views + "/register.html");
  } catch (error) {
    // Si ocurre un error, lo pasamos al middleware de manejo de errores
    next(error);
  }
});

module.exports = router;