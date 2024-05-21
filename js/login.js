document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor complete todos los campos.'
            });
            return;
        }

        // Obtener usuario desde localStorage
        const usuarioString = localStorage.getItem(email);
        
        if (usuarioString) {
            const usuario = JSON.parse(usuarioString);
            if (usuario.password === password) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Inicio de sesión exitoso!',
                    showConfirmButton: false,
                    timer: 1500
                });
                // Redirigir al usuario a la página de inicio (home)
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Contraseña incorrecta. Por favor, inténtelo de nuevo.'
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se encontró ningún usuario con ese correo electrónico.'
            });
        }
    });
});