<?php

    $servidor="localhost";
    $usuario="usuarioapp";
    $clave="123456";
    $bbdd="academic_cloud";
    
    try {
        $conexion=new mysqli($servidor,$usuario,$clave,$bbdd);
        $conexion->set_charset("UTF8");
    } catch (mysqli_sql_exception $e) {
        echo "<p>No se pudo conectar con la BBDD: ".$e->getmessage()."</p>";
        exit(0);
    }

?>