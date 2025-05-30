const login = document.querySelector("#login");

// Verifica si el usuario ya está registrado
login.addEventListener("click", () => {
  const user = document.querySelector("#username").value.trim(); // Obtiene el valor del input y elimina espacios en blanco al inicio y al final
  // Verifica si el usuario ingresó un nombre
  // de usuario antes de redirigir
  if (user !== "") {
    document.cookie = `username=${user}; path=/`; 
    document.location.href = "/";
  } else {
    alert("Por favor ingresa tu nombre de usuario");
  }
});