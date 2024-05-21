document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("_nombre").value;
    const apellido = document.getElementById("_apellido").value;
    const email = document.getElementById("_email").value;
    const password = document.getElementById("_password").value;
    const confirmPassword = document.getElementById("_confirmPassword").value;

    if (!nombre || !apellido || !email || !password || !confirmPassword) {
      alert('Por favor complete todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    // Verifico si el correo electrónico ya está registrado
    if (localStorage.getItem(email)) {
     // Usar SweetAlert para mostrar un mensaje de error
     Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El correo electrónico ya está registrado.'
    });
      return;
    }
// Validar que la contraseña tenga al menos 6 caracteres y contenga al menos una letra mayúscula
if (password.length < 6 || !/[A-Z]/.test(password)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "La contraseña debe tener al menos 6 caracteres y contener al menos una letra mayúscula.",
    });
    return;
  }
    // Guardar usuario en localStorage
    localStorage.setItem(email,JSON.stringify({ nombre, apellido, email, password }));

    // Usar SweetAlert para mostrar un mensaje de éxito
    Swal.fire({
      icon: "success",
      title: "¡Usuario registrado exitosamente!",
      text: "Nombre: " + nombre,
      customClass: {
        title: "text-size-sm",
        content: "text-size-sm",
        popup: "popup-size-sm"
      }
    }).then(() => {
      // Redirigir al usuario a la página de inicio (login)
      window.location.href = "registro.html";
    });
  });
});
