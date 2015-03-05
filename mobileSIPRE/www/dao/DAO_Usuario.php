<?php
include "../connection/connection.php";

class DAO_Usuario {

	public static function buscarUsuario($email, $password) {
		$query 	= "SELECT * FROM `usuario` WHERE `email`= '".$email."' AND `password` = '".$password."' ";
		$result = mysql_query($query);
		return mysql_fetch_assoc($result);
	}
	
	public static function crearUsuario($name, $lastname, $email, $code, $id, $career, $password, $password) {
			$query 	= "INSERT INTO `usuario`(`name`, `lastname`, `email`, `code`, `id`, `career`, `password`, `passwordc`) VALUES ('$name',                              '$lastname', '$email' , '$code' , '$id', '$career', '$password', '$password')";
            $result = mysql_query($query);
            return true;
	}
}

?>