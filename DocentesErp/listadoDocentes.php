<div class="distribucion-horizontal">
    <div class="items-horizontal filter-form">
        <label for="num_registros">Docentes por página:</label>
        <select name="num_registros" id="num_registros" onchange="ventana = document.getElementById('num_registros').value; pagina=1; actualizarListadoDocentes(null);">
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select>

        <button type="button" onclick="actualizarListadoDocentes('Anterior');">Pág. Anterior</button>
        <input type="text" id="pagina" class="pagina" readonly value="1" />
        <button type="button" onclick="actualizarListadoDocentes('Siguiente');">Pág. Siguiente</button>
    </div>
</div>

<div class="listado-header">
    <div class="icon-col"><img src="img/blanco.svg" width="30" height="20" border="0" /></div>
    <div class="icon-col"><img src="img/blanco.svg" width="30" height="20" border="0" /></div>
    <div class="icon-col"><img src="img/blanco.svg" width="30" height="20" border="0" /></div>
    <div class="col">Número Identificación</div>
    <div class="col">Nombre Completo</div>
    <div class="col">Especialidades</div>
    <div class="col">Disponibilidad</div>
    <div class="col">Comentarios</div>
</div>
<div id='listado-docentes'></div>
