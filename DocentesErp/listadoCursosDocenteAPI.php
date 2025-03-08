<?php
include "../docentes/accesoBBDD.php";

$json = json_decode(file_get_contents("php://input"), true);

// Recuperamos los valores del Array/JSON
$ventana = $json["ventana"];
$pagina = $json["pagina"];
$num_identificacion = "%" . $json["num_identificacion"] . "%";

// Cálculo del offset
$offset = ($pagina - 1) * $ventana;

// Construcción de la consulta SQL
$sql = "
    SELECT codigo_oficial, nombre_curso, cursos.fecha_inicio, cursos.fecha_fin, hora_inicio, hora_fin,
        CONCAT(
            CASE WHEN lunes = 1 THEN 'L' ELSE '' END,
            CASE WHEN martes = 1 THEN 'M' ELSE '' END,
            CASE WHEN miercoles = 1 THEN 'X' ELSE '' END,
            CASE WHEN jueves = 1 THEN 'J' ELSE '' END,
            CASE WHEN viernes = 1 THEN 'V' ELSE '' END,
            CASE WHEN sabado = 1 THEN 'S' ELSE '' END
        ) AS dias, aula
    FROM cursos
    INNER JOIN docencias ON cursos.numero_curso = docencias.numero_curso
    WHERE docencias.num_identificacion LIKE ?
    ORDER BY fecha_fin DESC
    LIMIT ? OFFSET ?";

$consulta = $conexion->prepare($sql);
$consulta->bind_param("sii", $num_identificacion, $ventana, $offset);
$consulta->execute();
$resultado = $consulta->get_result();

if ($resultado->num_rows === 0) {
    echo json_encode(['error' => "No Existen Cursos"]);
} else {
    $cursos = [];
    while ($curso = $resultado->fetch_object()) {
        $cursos[] = [
            'codigo' => $curso->codigo_oficial,
            'nombre' => $curso->nombre_curso,
            'inicio' => $curso->fecha_inicio,
            'fin' => $curso->fecha_fin,
            'dias' => $curso->dias,
            'horaInicio' => $curso->hora_inicio,
            'horaFin' => $curso->hora_fin,
            'aula' => $curso->aula
        ];
    }
    echo json_encode($cursos);
}
?>
