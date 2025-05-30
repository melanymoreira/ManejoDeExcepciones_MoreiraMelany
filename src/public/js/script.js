const socket = io(); // librería Socket.IO para la comunicación en tiempo real

// Verifica si el usuario está registrado a través de una cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift(); // Devuelve el valor de la cookie
}

// Redirige al usuario a register.html si no está registrado
const username = getCookie("username");
if (!username) {
  window.location.href = "register.html";
}

const send = document.querySelector("#send-message"); // Botón para enviar mensajes
const allMessages = document.querySelector("#all-messages"); // Contenedor de mensajes

// Muestra el nombre de usuario en la interfaz
send.addEventListener("click", () => {
  const message = document.querySelector("#message").value;
  // Verifica si el mensaje no está vacío
  if (message.trim()) {
    socket.emit("message", { user: username, message });
    document.querySelector("#message").value = "";
  }
});

// Escucha los mensajes enviados por otros usuarios
socket.on("message", ({ user, message }) => {
const isOwnMessage = user === username;
  const alignment = isOwnMessage ? "flex-row-reverse" : "flex-row";
  const bgColor = isOwnMessage ? "#dcf8c6" : "#fff"; 
  const extraStyle = isOwnMessage ? "margin-left:auto;" : "";

  // Crea un nuevo mensaje en el contenedor de mensajes y muestra el mensaje en la interfaz
  const msg = document.createRange().createContextualFragment(`
    <div class="message d-flex ${alignment} align-items-start mb-2" style="${extraStyle}">
      <img src="/img/Foto.jpg" class="rounded-circle me-2" style="width: 40px; height: 40px; object-fit: cover;">
      <div style="background:${bgColor};padding:10px 15px;border-radius:15px;max-width:80%;min-width:180px;">
        <div class="user-info d-flex align-items-center mb-1" style="justify-content: space-between;">
          <span class="fw-bold me-2">${user}</span>
          <span class="text-muted small" style="white-space:nowrap;">Hace 1 minuto</span>
        </div>
        <p class="mb-0">${message}</p>
      </div>
    </div>
  `);
  allMessages.append(msg);
});

// Referencia al contenedor de usuarios conectados
const usersList = document.querySelector("userslist");

// Notifica al servidor que un usuario se ha conectado
socket.emit("user_connected", username);

// Escucha la lista actualizada de usuarios conectados
socket.on('users', (usersStatus) => {
  const usersList = document.getElementById('usersList');
  usersList.innerHTML = '';
  Object.entries(usersStatus).forEach(([username, status]) => {
    const color = status === 'online' ? 'green' : 'red';
    usersList.innerHTML += `
      <li>
        <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${color};margin-right:5px;"></span>
        ${username}
      </li>
    `;
  });
});

