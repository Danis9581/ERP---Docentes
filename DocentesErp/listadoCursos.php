<div class="distribucion-horizontal">
    <div class="items-horizontal">
        <div class="items-horizontal filter-form">
            <label for="num_registros">Cursos por página:</label>
            <select name="num_registros" id="num_registros" onchange="paginaCursos=1; actualizarListadoCursosDocente(null);">
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
            
            <button type="button" id="anterior" onclick="actualizarListadoCursosDocente('Anterior');">Pág. Anterior</button>
            <input type="text" id="paginaCursos" class="pagina" value="1" readonly />
            <button type="button" id="siguiente" onclick="actualizarListadoCursosDocente('Siguiente');">Pág. Siguiente</button>
        </div>
    </div>
</div>

<div class="listado-header">
    <div class="icon-col"><img src="img/blanco.svg" width="30" height="20" border="0" /></div>
    <div class="col">Código Oficial</div>
    <div class="col">Nombre del Curso</div>
    <div class="col">Fecha Inicio</div>
    <div class="col">Fecha Fin</div>
    <div class="col">Hora Inicio</div>
    <div class="col">Hora Fin</div>
    <div class="col">Días Semana</div>
    <div class="col">Aula</div>
    <input type="hidden" id="num_identificacion" value="" />
</div>

<div id='listado-cursos'></div>
