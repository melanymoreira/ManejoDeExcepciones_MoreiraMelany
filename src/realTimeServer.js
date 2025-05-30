module.exports = (httpServer) => {
    const { Server } = require('socket.io'); // Importamos Server de socket.io
    const usersSocket = require('./usersSocket.js'); // Importamos nuestro módulo de usuarios en linea
    const io = new Server(httpServer); // Creamos una instancia de Server con nuestro servidor HTTP
    // Configuramos el servidor en tiempo real para manejar eventos de conexión
    usersSocket(io);
    io.on("connection", (socket) => {
        socket.on("message", (data) => {
            io.emit("message", {
                user: data.user, // El usuario que envía el mensaje
                message: data.message, // El mensaje enviado
            });
        });
    });
};