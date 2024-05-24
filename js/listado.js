document.addEventListener('DOMContentLoaded', function () {
    const openModal = document.querySelector('.crear-abm');
    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('.modal__close');
    const tblListado = document.querySelector('.tbl-listado table');
    const btnBuscar = document.querySelector('#buscar-id');
    const btnEliminar = document.querySelector('#eliminar');
    let vehiculos = []; // Array para almacenar los vehículos

    // Llamar a la función para inicializar la tabla
    //crearTablaListado();

    openModal.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('modal--show');
    });

    closeModal.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.remove('modal--show');
    });

    const btnCrear = document.querySelector('.btn__crear');
    btnCrear.addEventListener('click', (e) => {
        e.preventDefault();
        // Validaciones de los campos
        const matricula = document.querySelector('#matricula').value;
        const grupo = document.querySelector('#grupo').value;
        const modelo = document.querySelector('#modelo').value;
        const capacidadMaletero = document.querySelector('#capacidadMaletero').value;
        const marca = document.querySelector('#marca').value;
        const numPuertas = document.querySelector('#numPuerta').value;
        const numPlazas = document.querySelector('#numPlaza').value;

        //Paso los datos a una funcion que me valida los datos
        const validar = validarDatosVehiculos(matricula, grupo, modelo, capacidadMaletero, marca, numPuertas, numPlazas);
        //Si el valor es TRUE me agrega el vehiculo
        if (validar == true) {
            // Crear el objeto de vehículo
            const id = vehiculos.length + 1; // Generar un ID autoincremental
            const nuevoVehiculo = {
                id: id,
                matricula: matricula,
                grupo: grupo,
                modelo: modelo,
                capacidadMaletero: parseInt(capacidadMaletero),
                marca: marca,
                numPuertas: parseInt(numPuertas),
                numPlazas: parseInt(numPlazas)
            };

            // Agregar el nuevo vehículo al array
            vehiculos.push(nuevoVehiculo);

            // Actualizar la tabla
            actualizarTabla();

            // Limpiar los campos del formulario
            limpiarCampos();

            // Cerrar el modal
            modal.classList.remove('modal--show');
        }

    });

    // Función para actualizar la tabla con los datos de vehículos
    function actualizarTabla() {
        // Limpiar la tabla
        tblListado.innerHTML = `
            <tr>
                <th>ID</th>
                <th>Matrícula</th>
                <th>Grupo</th>
                <th>Modelo</th>
                <th>Capacidad Maletero</th>
                <th>Marca</th>
                <th>Número Puertas</th>
                <th>Número Plazas</th>
            </tr>
        `;

        // Agregar cada vehículo a la tabla
        vehiculos.forEach(vehiculo => {
            tblListado.innerHTML += `
                <tr>
                    <td>${vehiculo.id}</td>
                    <td>${vehiculo.matricula}</td>
                    <td>${vehiculo.grupo}</td>
                    <td>${vehiculo.modelo}</td>
                    <td>${vehiculo.capacidadMaletero}</td>
                    <td>${vehiculo.marca}</td>
                    <td>${vehiculo.numPuertas}</td>
                    <td>${vehiculo.numPlazas}</td>
                    <td><button class="btn-modificar" data-id="${vehiculo.id}"></button><button class="btn-eliminar" data-id="${vehiculo.id}"></button></td>
                </tr>
            `;
        });

        // Agregar event listener a los botones de modificar
        document.querySelectorAll('.btn-modificar').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                cargarVehiculoParaModificar(id);
            });
        });

        // Agregar el event listener a los botones de eliminar
        document.querySelectorAll('.btn-eliminar').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                eliminarVehiculo(id);
            });
        });
    }

    function cargarVehiculoParaModificar(id) {
        const vehiculo = vehiculos.find(veh => veh.id === id);
        if (vehiculo) {
            document.querySelector('#matricula').value = vehiculo.matricula;
            document.querySelector('#grupo').value = vehiculo.grupo;
            document.querySelector('#modelo').value = vehiculo.modelo;
            document.querySelector('#capacidadMaletero').value = vehiculo.capacidadMaletero;
            document.querySelector('#marca').value = vehiculo.marca;
            document.querySelector('#numPuerta').value = vehiculo.numPuertas;
            document.querySelector('#numPlaza').value = vehiculo.numPlazas;

            // Abrir el modal
            modal.classList.add('modal--show');

            // Cambiar el texto del botón crear por "Guardar cambios"
            const btnCrear = document.querySelector('.btn__crear');
            btnCrear.textContent = 'Guardar cambios';

            // Remover event listeners anteriores para evitar múltiples listeners
            btnCrear.replaceWith(btnCrear.cloneNode(true));
            const newBtnCrear = document.querySelector('.btn__crear');

            newBtnCrear.addEventListener('click', (e) => {
                e.preventDefault();
                guardarCambios(id);
            });
        }
    }

    function guardarCambios(id) {

        // Obtener los datos modificados del formulario
        const matricula = document.querySelector('#matricula').value;
        const grupo = document.querySelector('#grupo').value;
        const modelo = document.querySelector('#modelo').value;
        const capacidadMaletero = document.querySelector('#capacidadMaletero').value;
        const marca = document.querySelector('#marca').value;
        const numPuertas = document.querySelector('#numPuerta').value;
        const numPlazas = document.querySelector('#numPlaza').value;

        //Paso los datos a una funcion que me valida los datos
        const validar = validarDatosVehiculos(matricula, grupo, modelo, capacidadMaletero, marca, numPuertas, numPlazas);

        if (validar == true) {
            // Actualizar el vehículo en el array
            const vehiculo = vehiculos.find(veh => veh.id === id);
            if (vehiculo) {
                vehiculo.matricula = matricula;
                vehiculo.grupo = grupo;
                vehiculo.modelo = modelo;
                vehiculo.capacidadMaletero = parseInt(capacidadMaletero);
                vehiculo.marca = marca;
                vehiculo.numPuertas = parseInt(numPuertas);
                vehiculo.numPlazas = parseInt(numPlazas);

                // Actualizar la tabla
                actualizarTabla();

                // Limpiar los campos del formulario
                limpiarCampos();

                // Cerrar el modal
                modal.classList.remove('modal--show');

                // Restaurar el texto del botón a "Crear"
                const btnCrear = document.querySelector('.btn__crear');
                btnCrear.textContent = 'Crear';
            }
        }
    }

    // Función para eliminar un vehículo
    function eliminarVehiculo(id) {
        vehiculos = vehiculos.filter(vehiculo => vehiculo.id !== id);
        actualizarTabla();
    }

    // Función para limpiar los campos del formulario
    function limpiarCampos() {
        document.querySelector('#matricula').value = '';
        document.querySelector('#grupo').value = '';
        document.querySelector('#modelo').value = '';
        document.querySelector('#capacidadMaletero').value = '';
        document.querySelector('#marca').value = '';
        document.querySelector('#numPuerta').value = '';
        document.querySelector('#numPlaza').value = '';
    }

    //Buscar por ID --> si es distinto a vacio
    btnBuscar.addEventListener('click', () => {
        const idABuscar = document.querySelector('#numero-id').value.trim();

        if (idABuscar !== '') {
            const vehiculoEncontrado = vehiculos.find(vehiculo => vehiculo.id === parseInt(idABuscar));
            if (vehiculoEncontrado) {
                mostrarVehiculoEncontrado(vehiculoEncontrado);
            } else {
                mostrarError('Vehículo no encontrado');
            }
        } else {
            mostrarError('Por favor, ingrese un ID para buscar.');
        }
    });

    function mostrarVehiculoEncontrado(vehiculoEncontrado) {
        Swal.fire({
            icon: 'success',
            title: 'Vehículo encontrado',
            html: `
                <b>ID:</b> ${vehiculoEncontrado.id}<br>
                <b>Matrícula:</b> ${vehiculoEncontrado.matricula}<br>
                <b>Grupo:</b> ${vehiculoEncontrado.grupo}<br>
                <b>Modelo:</b> ${vehiculoEncontrado.modelo}<br>
                <b>Capacidad Maletero:</b> ${vehiculoEncontrado.capacidadMaletero}<br>
                <b>Marca:</b> ${vehiculoEncontrado.marca}<br>
                <b>Número Puertas:</b> ${vehiculoEncontrado.numPuertas}<br>
                <b>Número Plazas:</b> ${vehiculoEncontrado.numPlazas}<br>
            `
        });
    }
    function validarDatosVehiculos(matricula, grupo, modelo, capacidadMaletero, marca, numPuertas, numPlazas) {
        if (matricula === '' || grupo === '' || modelo === '' || capacidadMaletero === '' || marca === '' || numPuertas === '' || numPlazas === '') {
            mostrarError('Por favor, complete todos los campos.');
            return false;
        }

        if (!/^[a-zA-Z0-9]{1,6}$/.test(matricula)) {
            mostrarError('La matrícula debe contener hasta 6 caracteres alfanuméricos.');
            return false;
        }

        if (!/^[a-zA-Z\s]{1,8}$/.test(grupo)) {
            mostrarError('El grupo debe contener hasta 8 caracteres y solo letras.');
            return false;
        }

        if (modelo.length > 10) {
            mostrarError('El modelo debe contener hasta 10 caracteres.');
            return false;
        }

        if (isNaN(capacidadMaletero) || capacidadMaletero < 0 || capacidadMaletero > 1000) {
            mostrarError('La capacidad de maletero debe ser un número entre 0 y 1000.');
            return false;
        }

        if (!/^[a-zA-Z\s]{1,12}$/.test(marca)) {
            mostrarError('La marca debe contener hasta 12 caracteres y solo letras.');
            return false;
        }

        if (isNaN(numPuertas) || numPuertas < 0 || numPuertas > 6) {
            mostrarError('El número de puertas debe ser un número entre 0 y 6.');
            return false;
        }

        if (isNaN(numPlazas) || numPlazas < 0 || numPlazas > 6) {
            mostrarError('El número de plazas debe ser un número entre 0 y 6.');
            return false;
        }

        // Si todas las validaciones pasan, retorna true para indicar que los datos son válidos.
        return true;
    }

    // Función para mostrar un error con SweetAlert para todos los campos
    function mostrarError(mensaje) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: mensaje
        });
    }


    // Para el desplazamiento del menú de tablas cuando hago click en el botón Servicios
    document.getElementById('btn-servicios').addEventListener('click', function (event) {
        event.preventDefault();
        var opciones = document.getElementById('opciones-servicios');
        if (!opciones.classList.contains('visible')) {
            opciones.style.display = 'flex';
            setTimeout(function () {
                opciones.classList.add('visible');
            }, 10); // Pequeño retraso para permitir el cambio de display antes de la transición
        } else {
            opciones.classList.remove('visible');
            setTimeout(function () {
                opciones.style.display = 'none';
            }, 500); // Esperar a que la transición termine antes de ocultar
        }
    });

    // Funciones para mostrar diferentes tablas
    function mostrarAlquileres() {
        document.querySelectorAll('.tbl-listado').forEach(tabla => {
            tabla.style.display = 'none';
        });
        document.getElementById('tabla-alquileres').style.display = 'block';
        contenidoDinamico.innerHTML = `
        <table>
            <tr>
                <th>ID Alquiler</th>
                <th>Duración</th>
                <th>Precio Total</th>
            </tr>
        </table>
    `;
    }

    function mostrarClientes() {
        document.querySelectorAll('.tbl-listado').forEach(tabla => {
            tabla.style.display = 'none';
        });
        document.getElementById('tabla-clientes').style.display = 'block';
        contenidoDinamico.innerHTML = `
        <table>
            <tr>
                <th>ID Cliente</th>
                <th>Nombre</th>
                <th>DNI</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Edad</th>
                <th>Pago</th>
                <th>Permiso</th>
            </tr>
        </table>
    `;
    }

    function mostrarOficinas() {
        document.querySelectorAll('.tbl-listado').forEach(tabla => {
            tabla.style.display = 'none';
        });
        document.getElementById('tabla-oficinas').style.display = 'block';
        contenidoDinamico.innerHTML = `
        <table>
            <tr>
                <th>ID Oficina</th>
                <th>Calle</th>
                <th>Número</th>
                <th>CP</th>
                <th>Teléfono</th>
                <th>Ciudad</th>
            </tr>
        </table>
    `;
    }
    document.getElementById('btn-oficinas').addEventListener('click', mostrarOficinas);

    function mostrarVehiculos() {
        document.querySelectorAll('.tbl-listado').forEach(tabla => {
            tabla.style.display = 'none';
        });
        document.getElementById('tabla-vehiculos').style.display = 'block';
        contenidoDinamico.innerHTML = `
        <table>
            <tr>
                <th>ID</th>
                <th>Vehículo</th>
            </tr>
            <!-- Agrega aquí las filas de la tabla -->
        </table>
    `;
    }

    function mostrarReservas() {
        document.querySelectorAll('.tbl-listado').forEach(tabla => {
            tabla.style.display = 'none';
        });
        document.getElementById('tabla-reservas').style.display = 'block';
        contenidoDinamico.innerHTML = `
        <table>
            <tr>
                <th>ID Reserva</th>
                <th>Nombre Reserva</th>
                <th>ID Usuario</th>
                <th>ID Alquiler</th>
                <th>ID Vehículo</th>
            </tr>
        </table>
    `;
    }
    document.getElementById('btn-reservas').addEventListener('click', mostrarReservas);

    function mostrarReportes() {
        document.querySelectorAll('.tbl-listado').forEach(tabla => {
            tabla.style.display = 'none';
        });
        document.getElementById('tabla-reportes').style.display = 'block';
        contenidoDinamico.innerHTML = `
        <table>
            <tr>
                <th>ID Reporte</th>
                <th>ID Cliente</th>
                <th>Motivo</th>
                <th>Fecha</th>
            </tr>
        </table>
    `;
    }
    document.getElementById('btn-reportes').addEventListener('click', mostrarReportes);

    // Event listeners para los botones
    document.getElementById('btn-alquileres').addEventListener('click', mostrarAlquileres);
    document.getElementById('btn-clientes').addEventListener('click', mostrarClientes);
    document.getElementById('btn-oficinas').addEventListener('click', mostrarOficinas);
    document.getElementById('btn-vehiculos').addEventListener('click', mostrarVehiculos);
    document.getElementById('btn-reservas').addEventListener('click', mostrarReservas);
    document.getElementById('btn-reportes').addEventListener('click', mostrarReportes);

    // Para consultar antes de Cerrar Sesión
    const btnCerrarSesion = document.querySelector('a[href="/registro.html"]');
    btnCerrarSesion.addEventListener('click', function (e) {
        e.preventDefault();
        Swal.fire({
            title: '¿Cerrar sesión?',
            text: '¿Estás seguro de que quieres cerrar sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ffbe70',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "/index.html";
            }
        });
    });
    
});
