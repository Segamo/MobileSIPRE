<?php

	$conexion = mysql_connect("localhost", "root", "root") or die("Error de conexion");
    mysql_select_db("mobilesipre", $conexion) or die("Error base de datos");

?>