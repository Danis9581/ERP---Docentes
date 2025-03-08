<?php
// Conectamos con la BBDD
include "../docentes/accesoBBDD.php";

// Transformamos en un Array el JSON enviado por POST al WebService
$json = json_decode(file_get_contents("php://input"), true);

$num_identificacion = $json["num_identificacion"];

if (empty($num_identificacion)) {
    echo json_encode(["error" => "num_identificacion no recibido"]);
    exit;
}

$sql = "SELECT * FROM docentes WHERE num_identificacion LIKE ?";
$consulta = $conexion->prepare($sql);

if (!$consulta) {
    echo json_encode(["error" => "Error preparando la consulta: " . $conexion->error]);
    exit;
}

$consulta->bind_param("s", $num_identificacion);
if (!$consulta->execute()) {
    echo json_encode(["error" => "Error ejecutando la consulta: " . $consulta->error]);
    exit;
}

$resultado = $consulta->get_result();
$docentes = [];

while ($registro = $resultado->fetch_object()) {
    $docentes[] = [
        'num_identificacion' => $registro->num_identificacion,
        'nombre_completo' => $registro->nombre_completo,
        'especialidades' => $registro->especialidades,
        'disponibilidad' => $registro->disponibilidad,
        'comentarios' => $registro->comentarios
    ];
}

if (empty($docentes)) {
    echo json_encode(["mensaje" => "No se encontraron docentes con esa identificación."]);
} else {
    echo json_encode($docentes);
}
?>
