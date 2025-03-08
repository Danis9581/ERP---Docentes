<?php
// Conectar a la base de datos
include "../docentes/accesoBBDD.php";

if ($conexion->connect_error) {
    echo json_encode(['resultado' => "Error en la conexión a la base de datos", 'detalle' => $conexion->connect_error]);
    exit;
}

// Leer el JSON enviado por POST
$json = json_decode(file_get_contents("php://input"), true);

$num_identificacion = $json["num_identificacion"];
$nombre_completo = $json["nombre_completo"];
$especialidades = $json["especialidades"];
$disponibilidad = $json["disponibilidad"];
$comentarios = $json["comentarios"];

// Verificar si el docente ya existe
$sql = "SELECT nombre_completo FROM docentes WHERE nombre_completo = ?";
$consulta = $conexion->prepare($sql);
$consulta->bind_param("s", $nombre_completo);
$consulta->execute();
$resultado = $consulta->get_result();

if ($resultado->num_rows > 0) {
    echo json_encode(['resultado' => "El docente ya existe"]);
} else {
    // Insertar nuevo docente
    $sql = "INSERT INTO docentes (num_identificacion, nombre_completo, especialidades, disponibilidad, comentarios)
            VALUES (?, ?, ?, ?, ?)";
    $consulta = $conexion->prepare($sql);
    $consulta->bind_param("sssss", $num_identificacion, $nombre_completo, $especialidades, $disponibilidad, $comentarios);

    if (!$consulta->execute()) {
        echo json_encode(['resultado' => "Error al insertar el registro", 'detalle' => $consulta->error]);
    } else {
        echo json_encode(['resultado' => "OK"]);
    }
}
?>