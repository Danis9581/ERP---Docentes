<?php

include "../docentes/accesoBBDD.php";

$json = json_decode(file_get_contents("php://input"), true);
$num_identificacion = $json["num_identificacion"];

$response = [];

if (!isset($num_identificacion)) {
    $response['resultado'] = "Error: Identificación no válida.";
    echo json_encode($response);
    exit;
}

$sql = "DELETE FROM docentes WHERE num_identificacion LIKE ?";
$consulta = $conexion->prepare($sql);
$consulta->bind_param("s", $num_identificacion);

// Ejecutar la consulta
if (!$consulta->execute()) {
    $response['resultado'] = "Error al ejecutar la consulta: " . $consulta->error;
} else {
    if ($consulta->affected_rows > 0) {
        $response['resultado'] = "OK";
    } else {
        $response['resultado'] = "No se encontró el docente con ese ID";
    }
}

echo json_encode($response);

?>
