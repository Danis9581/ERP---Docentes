<form id="formulario-docentes" class="formConsulta">
    <h2>Formulario alta de docentes</h2>
    
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
			<textarea id="comentarios" rows="8" cols="40" name="comentarios" maxlength="150"></textarea>
        </div>
    </div>
    
    <div class="row">
        <div class="col-33" style="text-align:center;" >
            <button type="button" value="Guardar" onclick="altaDocentesApi();">Guardar</button>
        </div>
        <div class="col-33" style="text-align:center;">
            <button type="reset" value="Cancelar">Empezar de nuevo</button>
        </div>
        <div class="col-33" style="text-align:center;">
            <button type="button" value="Volver"
                onclick="cargarMenuSecundario('docentes.php',1); pagina=1; ventana=25; actualizarListadoDocentes(null);">Volver</button>
        </div>
    </div>
</form>
