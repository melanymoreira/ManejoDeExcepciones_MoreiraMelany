const express = require('express'); // Importamos express
const { createServer } = require('http');// Importamos createServer de http para crear un servidor HTTP
const realTimeServer = require('./realTimeServer'); // Importamos nuestro servidor en tiempo real
const path = require('path'); // Importamos path para manejar rutas de archivos
const cookieParser = require('cookie-parser'); // Importamos cookie-parser para manejar cookies

// Importamos las rutas
const app = express();
const httpServer = createServer(app);

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
// Para servir index.html en la raíz
app.get('/in', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Para servir register.html
app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});
app.use(cookieParser()); // Para manejar cookies

// Rutas
app.use(require('./routes'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

// Iniciar el servidor
httpServer.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en http://localhost:${app.get('port')}`);
})

// Llamo al servidor en tiempo real
realTimeServer(httpServer);