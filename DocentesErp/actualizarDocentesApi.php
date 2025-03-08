<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
// Conectamos con la BBDD
include "../docentes/accesoBBDD.php";

// Imprimir mensaje para depuración
error_log("Recibiendo solicitud para actualizar docente...");

// Transformamos en un Array el JSON enviado por POST al WebService
$json = json_decode(file_get_contents("php://input"), true);

// Verificar si el JSON se está decodificando correctamente
if (!$json) {
    error_log("Error al decodificar el JSON");
    echo json_encode(['resultado' => 'Error al recibir los datos']);
    exit;
}

// Recuperamos los valores del Array/JSON
$clave = $json["clave"];
$num_identificacion = trim($json["num_identificacion"]);
$nombre_completo = trim($json["nombre_completo"]);
$especialidades = $json["especialidades"];
$disponibilidad = $json["disponibilidad"];
$comentarios = $json["comentarios"];

$sql = "UPDATE docentes SET num_identificacion=?, nombre_completo=?, especialidades=?, disponibilidad=?, comentarios=? WHERE num_identificacion LIKE ?;";

error_log("Ejecutando consulta SQL: $sql");

$consulta = $conexion->prepare($sql);
$consulta->bind_param("ssssss", $num_identificacion, $nombre_completo, $especialidades, $disponibilidad, $comentarios, $clave);

// Ejecutamos la consulta
if ($consulta->execute()) {
    echo json_encode(['resultado' => 'OK']);
} else {
    echo json_encode(['resultado' => 'Error al actualizar el registro', 'error' => $consulta->error]);
}

?>
