

var ventana = 25; 
var pagina = 1; 
var ventanaCursos = 25;
var paginaCursos = 1;
var peticionAPI = {}; 
var datosGlobales = []; 

// Función para mostrar resultados en la interfaz
function mostrarResultados(datos, contenedor) {
    let resultadoHTML = '';
    if (Array.isArray(datos) && datos.length > 0) {
        datos.forEach(docente => {
            resultadoHTML += `
            <div class='listado-row'>
                <div class='icon-col'>
                   <a href='#'>
		                	<img src='img/lupa.svg' alt='Consultar' title='Consultar' width='30' height='20' border='0' onclick='consultarDocente("${docente.num_identificacion}","${docente.nombre_completo}");'/>
                   </a>
                </div>
                <div class='icon-col'>
                    <a href='#'>
                        <img src='img/borrar.svg' alt='Eliminar' title='Eliminar' width='30' height='20' border='0' onclick="eliminarDocente('${docente.num_identificacion}');"/>
                    </a>
                </div>
		            <div class='icon-col'>
		                <a href='#'>
		                  <img src='img/InfoAhora.svg' alt='InfoAhora' title='InfoAhora' width='30' height='20' border='0' onclick="consultarCursosDocente('${docente.num_identificacion}','${docente.nombre_completo}');" />			    
	  	              </a>				
	            	</div>
            		<div class='col'>${docente.num_identificacion}</div>
            		<div class='col'>${docente.nombre_completo}</div>
            		<div class='col'>${docente.especialidades}</div>
            		<div class='col'>${docente.disponibilidad}</div>
            		<div class='col'>
		              	<img src="img/Comments.svg" alt="Comentarios docente" title="${docente.comentarios}" width="30" height="20" border="0" onclick="comentarios('${docente.comentarios}')"/>
                </div>
            </div>`;
        });
    } else {
        resultadoHTML = `
            <div class='listado-row'>
                <div style="flex:8; text-align: center;">No hay docentes disponibles</div>
            </div>`;
    }
    document.getElementById(contenedor).innerHTML = resultadoHTML;
}

// Función para actualizar el listado de docentes
function actualizarListadoDocentes(direccion = null) {
    let paginaTemporal = pagina;

    // Verificar la dirección
    if (direccion === "Anterior" && pagina > 1) {
        paginaTemporal--;
    } else if (direccion === "Siguiente") {
        paginaTemporal++;
    }

    peticionAPI = { 'ventana': ventana, 'pagina': paginaTemporal };

    fetch('docentes/leerdocentesAPI.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(peticionAPI)
    })
    .then(respuesta => {
        if (!respuesta.ok) {
            throw new Error(`HTTP error! status: ${respuesta.status}`);
        }
        return respuesta.json();
    })
    .then(datos => {
        if (datos.error) {
            alert(datos.error);
        } else {
            pagina = paginaTemporal;
            document.getElementById("pagina").value = pagina;

            // Actualiza la lista de docentes
            datosGlobales = datos; // Guarda datos globales para filtros
            mostrarResultados(datos, 'listado-docentes');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Función para dar de alta docentes
function altaDocentesApi() {
    let num_identificacion = document.getElementById('num_identificacion').value.trim();
    let nombre_completo = document.getElementById('nombre_completo').value.trim();
    let especialidades = document.getElementById('especialidades').value;
    let disponibilidad = document.getElementById('disponibilidad').value;
    let comentarios = document.getElementById('comentarios').value;

    // Validaciones de los campos
    if (!num_identificacion) {
        alert("El número de identificación debe ser un valor numérico válido.");
        return;
    }
    if (!nombre_completo) {
        alert("El nombre completo es obligatorio.");
        return;
    }
    if (!especialidades) {
        alert("La especialidad es obligatoria.");
        return;
    }
    if (!disponibilidad) {
        alert("La disponibilidad es obligatoria.");
        return;
    }

    // Crear JSON con los datos del formulario
    let peticionAPI = {
        "num_identificacion": num_identificacion,
        "nombre_completo": nombre_completo,
        "especialidades": especialidades,
        "disponibilidad": disponibilidad,
        "comentarios": comentarios
    };

    // Enviar solicitud al servidor
    fetch('docentes/altaDocentesApi.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(peticionAPI)
    })
    .then(respuesta => {
        if (!respuesta.ok) {
            throw new Error(`HTTP error! status: ${respuesta.status}`);
        }
        return respuesta.json();
    })
    .then(datos => {
        if (datos['resultado'] === "OK") {
            alert("Docente dado de alta correctamente.");
            actualizarListadoDocentes(null);

            // Resetear el formulario
            document.getElementById("formulario-docentes").reset();
        } else {
            alert(datos['resultado']);
        }
    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
        alert("Error al realizar la operación.");
    });
}


// Función para eliminar un docente
function eliminarDocente(num_identificacion) {
    if (confirm("¿Estás seguro que deseas eliminar al docente con identificación '" + num_identificacion + "'?")) {
        	     
        let peticionAPI = { "num_identificacion": num_identificacion };

        fetch('docentes/borrarDocentesApi.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(peticionAPI)
        })
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error(`HTTP error! status: ${respuesta.status}`);
            }
            return respuesta.json();
        })
        .then(datos => {	      
            console.log("Respuesta del servidor:", datos);  

            actualizarListadoDocentes(null);

            if (datos['resultado'] === "OK") {
                alert("Docente eliminado correctamente.");
            } else {
                alert("Error al eliminar el docente: " + datos['resultado']);
            }
        })
        .catch(error => {
			alert(error);
            console.error('Error:', error);
            alert("Hubo un problema al eliminar al docente.");
        });
    }
}


// Inicializar la carga de docentes al cargar la página
actualizarListadoDocentes();

// Función para recuperar los datos de un usuario dado previamente de alta
function consultarDocente(num_identificacion,nombre_completo) {
    document.getElementById("barra-opciones").innerHTML+=`<button type="submit" class="opcion activo">Datos del docente: ${nombre_completo}</button>`;
    document.getElementById("opcion1").className = "opcion atenuado";

    // Cargar el formulario de consulta vacío
    fetch("docentes/consultarDocentes.php")
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error(`HTTP error! status: ${respuesta.status}`);
            }
            return respuesta.text(); 
        })
        .then(datos => {	          
            document.getElementById("contenido-principal").innerHTML = datos;

            // Llamar a la API para rellenar los datos del docente
            const peticionAPI = { "num_identificacion": num_identificacion };
            fetch('docentes/consultarDocentesApi.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(peticionAPI)
            })
                .then(respuesta => {
                    if (!respuesta.ok) {
                        throw new Error(`HTTP error! status: ${respuesta.status}`);
                    }
                    return respuesta.json();
                })
                .then(datos => {
                    if (datos.length > 0) {
                        const docente = datos[0];
						
						clave = docente.num_identificacion;

                        document.getElementById('num_identificacion').value = docente.num_identificacion;
                        document.getElementById('nombre_completo').value = docente.nombre_completo;
                        document.getElementById('especialidades').value = docente.especialidades;
                        document.getElementById('disponibilidad').value = docente.disponibilidad;
                        document.getElementById('comentarios').value = docente.comentarios || ''; // Evitar null
                    } else {
                        alert("No se encontró el docente.");
                        botonDocente.textContent = "Datos del docente: No encontrado";
                    }
                })
                .catch(error => {
                    console.error('Error en la solicitud API:', error);
                    alert("Error al consultar los datos del docente.");
                    botonDocente.textContent = "Datos del docente: Error";
                });
        })
        .catch(error => {
            console.error('Error al cargar el formulario:', error);
            alert("Error al cargar el formulario del docente. Verifica la ruta de `consultarDocentes.php`.");
            botonDocente.textContent = "Datos del docente: Error";
        });
}

// Función para actualizar los datos de un usuario dado previamente de alta
function actualizarDocente(clave) {
    let num_identificacion = document.getElementById('num_identificacion').value.trim();
    let nombre_completo = document.getElementById('nombre_completo').value.trim();
    let especialidades = document.getElementById('especialidades').value;
    let disponibilidad = document.getElementById('disponibilidad').value;
    let comentarios = document.getElementById('comentarios').value;

    if (num_identificacion == "" || nombre_completo == "" || especialidades == "" || disponibilidad == "") {
        alert("No puedes dejar ningún campo del formulario vacío.");
        return;
    }

    // Creamos el JSON con el objeto a enviar a la API
    let peticionAPI = {
        "clave": clave,
        "num_identificacion": num_identificacion,
        "nombre_completo": nombre_completo,
        "especialidades": especialidades,
        "disponibilidad": disponibilidad,
        "comentarios": comentarios
    };

    fetch('docentes/actualizarDocentesApi.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(peticionAPI)
    })
    .then(respuesta => {
        if (!respuesta.ok) {
            throw new Error(`HTTP error! status: ${respuesta.status}`);
        }
        return respuesta.json();
    })
    .then(datos => {
        if (datos['resultado'] === "OK") {
            alert("Docente actualizado.");
        } else {
            alert(datos['resultado']);
        }
        cargarMenuSecundario('docentes.php', 1); 
        actualizarListadoDocentes(null);
    })
    .catch(error => {
        console.error('Error en la petición:', error);
        alert("Error al actualizar los datos del docente.");
    });
}

    // Función para mostrar en alert el comentario del docente
	function comentarios(comentario) {
	    if (!comentario) {
	        alert("No hay comentarios disponibles.");
	    } else {
	        alert(`${comentario}`);
	    }
	}
	//----------------------------OPERATIVA CURSOS------------------------------


	// Función para generar las imágenes de los días de la semana
	function generarImagenesDias(dias) {
	    const diasSemana = ['L', 'M', 'X', 'J', 'V', 'S'];
	    let html = '';
	    for (let dia of diasSemana) {
	        if (dias.includes(dia)) {
	            html += `<img src="img/diaActivo.png" alt="${dia}" title="${dia}" width="20" height="20"/>`;
	        } else {
	            html += `<img src="img/diaNoActivo.png" alt="${dia}" title="${dia}" width="20" height="20"/>`;
	        }
	    }
	    return html;
	}

	// Función que modifica un elemento HTML con el contenido del listado
	function consultarCursosDocente(num_identificacion,nombre_completo) {

		document.getElementById("barra-opciones").innerHTML+=`<button type="submit" class="opcion activo">Cursos realizado por: ${nombre_completo}</button>`;
		document.getElementById("opcion1").className = "opcion atenuado";

	    // Hacemos el fetch para obtener el HTML de listadoCursos.php
	    fetch('docentes/listadoCursos.php')
	        .then(respuesta => {
	            if (!respuesta.ok) {
	                throw new Error(`HTTP error! status: ${respuesta.status}`);
	            }
	            return respuesta.text(); // Obtener el HTML como texto
	        })
	        .then(datos => {
	            // Aquí solo añadimos el HTML estático de listadoCursos.php al contenedor
	            document.getElementById("contenido-principal").innerHTML = datos; // Reemplazamos el contenido
				
				document.getElementById("num_identificacion").value=num_identificacion;
				
				// Aquí es donde definimos la petición para los cursos
				peticionAPI = {
				    'ventana': ventanaCursos,
				    'pagina': paginaCursos,
				    'num_identificacion': num_identificacion
				};
				
				// Ahora, realizamos el fetch para obtener los cursos desde la API
				fetch('docentes/listadoCursosDocenteAPI.php', {
				    method: 'POST',
				    headers: {
				        'Content-Type': 'application/json' 
				    },
				    body: JSON.stringify(peticionAPI) 
				})
				    .then(respuesta => {
				        if (!respuesta.ok) {
				            throw new Error(`HTTP error! status: ${respuesta.status}`);
				        }
				        return respuesta.json(); 
				    })
				    .then(datos => {
						var resultadoHTML = '';
				        if (Array.isArray(datos) && datos.length > 0) {

				            // Recorrer el array de cursos y añadirlos al HTML
				            datos.forEach(curso => {
				                resultadoHTML += `
				                <div class='listado-row'>
				                    <div class='col'>${curso.codigo}</div>
				                    <div class='col'>${curso.nombre}</div>
				                    <div class='col'>${curso.inicio}</div>
				                    <div class='col'>${curso.fin}</div>
				                    <div class='col'>${curso.horaInicio}</div>
				                    <div class='col'>${curso.horaFin}</div>
				                    <div class='col'>${generarImagenesDias(curso.dias)}</div>
				                    <div class='col'>${curso.aula}</div>
				                </div>`;
				            });
				            // Insertamos los resultados en el contenedor de cursos
				            document.getElementById("listado-cursos").innerHTML = resultadoHTML;
				        }
				    })
				    .catch(error => {
				        console.error('Error:', error);
				    });	
	        })
	        .catch(error => {
	            console.error('Error al cargar listadoCursos.php:', error);
	        });

	}

	// Función para actualizar el listado de registros en base al botón que se haya pulsado (Anterior ó Siguiente)
	function actualizarListadoCursosDocente(direccion) {
	    // Actualizamos la página en función de la dirección que se haya seleccionado
	    if ((direccion == "Anterior") && (paginaCursos > 1)) {
	        paginaCursos--;
	    } else if (direccion == "Siguiente") {
	        paginaCursos++;
	    }

		let num_identificacion=document.getElementById("num_identificacion").value;
		
	    // Creamos el JSON con el objeto a enviar a la API
	    // peticionAPI={ventana:ventana,pagina:pagina,modalidad:modalidad};
		peticionAPI = {
					    'ventana': ventanaCursos,
					    'pagina': paginaCursos,
					    'num_identificacion': num_identificacion
					};

		// Ahora, realizamos el fetch para obtener los cursos desde la API
		fetch('docentes/listadoCursosDocenteAPI.php', {
		    method: 'POST',
		    headers: {
		        'Content-Type': 'application/json' 
		    },
		    body: JSON.stringify(peticionAPI) 
		})
		    .then(respuesta => {
		        if (!respuesta.ok) {
		            throw new Error(`HTTP error! status: ${respuesta.status}`);
		        }
		        return respuesta.json(); 
		    })
		    .then(datos => {
				var resultadoHTML = '';
		        if (Array.isArray(datos) && datos.length > 0) {

		            // Recorrer el array de cursos y añadirlos al HTML
		            datos.forEach(curso => {
		                resultadoHTML += `
		                <div class='listado-row'>
		                    <div class='col'>${curso.codigo}</div>
		                    <div class='col'>${curso.nombre}</div>
		                    <div class='col'>${curso.inicio}</div>
		                    <div class='col'>${curso.fin}</div>
		                    <div class='col'>${curso.horaInicio}</div>
		                    <div class='col'>${curso.horaFin}</div>
		                    <div class='col'>${generarImagenesDias(curso.dias)}</div>
		                    <div class='col'>${curso.aula}</div>
		                </div>`;
		            });
		            // Insertamos los resultados en el contenedor de cursos
		            document.getElementById("listado-cursos").innerHTML = resultadoHTML;
					
					document.getElementById("paginaCursos").value=paginaCursos;
									
		        } else {
					if (isNaN(datos.length)) {
		                // restamos una unidad a la página porque hemos llegado al final.
		                paginaCursos--;
		            }
					
				}
						
		    })
		    .catch(error => {
		        console.error('Error:', error);
		    });
	}
	
	
	
	
	
	
