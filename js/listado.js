document.addEventListener('DOMContentLoaded', function() {
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

        if (matricula === '' || grupo === '' || modelo === '' || capacidadMaletero === '' || marca === '' || numPuertas === '' || numPlazas === '') {
            mostrarError('Por favor, complete todos los campos.');
            return;
        }

        if (!/^[a-zA-Z0-9]{1,6}$/.test(matricula)) {
            mostrarError('La matrícula debe contener hasta 6 caracteres alfanuméricos.');
            return;
        }

        if (!/^[a-zA-Z\s]{1,8}$/.test(grupo)) {
            mostrarError('El grupo debe contener hasta 8 caracteres y solo letras.');
            return;
        }

        if (modelo.length > 10) {
            mostrarError('El modelo debe contener hasta 10 caracteres.');
            return;
        }

        if (isNaN(capacidadMaletero) || capacidadMaletero < 0 || capacidadMaletero > 1000) {
            mostrarError('La capacidad de maletero debe ser un número entre 0 y 1000.');
            return;
        }

        if (!/^[a-zA-Z\s]{1,12}$/.test(marca)) {
            mostrarError('La marca debe contener hasta 12 caracteres y solo letras.');
            return;
        }

        if (isNaN(numPuertas) || numPuertas < 0 || numPuertas > 6) {
            mostrarError('El número de puertas debe ser un número entre 0 y 6.');
            return;
        }

        if (isNaN(numPlazas) || numPlazas < 0 || numPlazas > 6) {
            mostrarError('El número de plazas debe ser un número entre 0 y 6.');
            return;
        }

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
                    <td><button class="btn-eliminar" data-id="${vehiculo.id}"></button><button class="btn-modificar" data-id="${vehiculo.id}"></button></td>
                </tr>
            `;
        });

        // Agregar el event listener a los botones de eliminar
        document.querySelectorAll('.btn-eliminar').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                eliminarVehiculo(id);
            });
        });
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
                <b>Litros:</b> ${vehiculoEncontrado.litros}<br>
            `
        });
    }

    

    // Función para mostrar un error con SweetAlert para todos los campos
    function mostrarError(mensaje) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: mensaje
        });
    }
    
});

