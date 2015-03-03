<?php
include "../dao/DAO_Usuario.php";

class ControlUsuario {

	public function consultar($email, $password) {
		$result = DAO_Usuario::buscarUsuario($email, $password);
		return $result;
	}

	public function registrar($name, $lastname, $email, $code, $id, $career, $password, $passwordc) {
		return DAO_Usuario::crearUsuario($name, $lastname, $email, $code, $id, $career, $password, $passwordc);
	}
}

?>