module.exports = (io) => {
  // Lista de usuarios y su estado
  let usersStatus = {};

  io.on('connection', (socket) => {
    // Cuando un usuario se conecta
    socket.on('user_connected', (username) => {
      socket.username = username;
      usersStatus[username] = 'online';
      io.emit('users', usersStatus);
    });

    // Cuando un usuario se desconecta
    socket.on('disconnect', () => {
      if (socket.username) {
        usersStatus[socket.username] = 'offline';
        io.emit('users', usersStatus);
      }
    });
  });
};