<?php
include "../docentes/accesoBBDD.php";

$json = json_decode(file_get_contents("php://input"), true);

$ventana = isset($json["ventana"]) ? intval($json["ventana"]) : 25;
$pagina = isset($json["pagina"]) ? intval($json["pagina"]) : 1;
$offset = ($pagina - 1) * $ventana;

$sql = "SELECT num_identificacion, nombre_completo, especialidades, disponibilidad, comentarios
        FROM docentes
        ORDER BY nombre_completo
        LIMIT ? OFFSET ?";
$consulta = $conexion->prepare($sql);
$consulta->bind_param("ii", $ventana, $offset);
$consulta->execute();
$resultado = $consulta->get_result();

if ($resultado->num_rows == 0) {
    echo json_encode(["error" => "No se encontraron docentes"]);
} else {
    $docentes = [];
    while ($docente = $resultado->fetch_object()) {
        $docentes[] = [
            'num_identificacion' => $docente->num_identificacion,
            'nombre_completo' => $docente->nombre_completo,
            'especialidades' => $docente->especialidades,
            'disponibilidad' => $docente->disponibilidad,
            'comentarios' => $docente->comentarios
        ];
    }
    echo json_encode($docentes);
}
?>
