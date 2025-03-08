<form id="formulario-usuarios" class="formConsulta">
    <h2>Consulta de docentes</h2>
    <div class="row">
        <div class="col-33">
            <label for="num_identificacion">Número de identificación:</label>
            <input type="text" id="num_identificacion" name="num_identificacion" maxlength="15" required />
        </div>
        <div class="col-33">
            <label for="nombre_completo">Nombre del docente:</label>
            <input type="text" id="nombre_completo" name="nombre_completo" maxlength="50" required />
        </div>
    </div>
    <div class="row">
        <div class="col-33">
            <label for="especialidades">Especialidad:</label>
            <input type="text" id="especialidades" name="especialidades" required />
        </div>
        <div class="col-33">
            <label for="disponibilidad">Disponibilidad:</label>
            <input type="text" id="disponibilidad" name="disponibilidad" required />
        </div>
        <div class="col-50">
            <label for="comentarios">Comentarios:</label>
			<textarea  rows="8" id="comentarios" name="comentarios" maxlength="150"></textarea>
        </div>
    </div>
    <div class="row" style="text-align:center;">
        <div class="col-50">
			<button type="button" value="Actualizar" onclick="actualizarDocente(clave);">Actualizar</button>
        </div>
        <div class="col-50">
            <button type="button" value="Cancelar" onclick="cargarMenuSecundario('docentes.php',1); actualizarListadoDocentes(null);">Cancelar</button>
        </div>
    </div>
</form>
