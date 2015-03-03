<?php

session_start();
header('Content-type: text/javascript; charset=utf-8');
header('Access-Control-Allow-Origin: *');
include "../modelo/ControlUsuario.php";

@$nombreServicio = $_GET['nombreServicio'];

switch ($nombreServicio) {
    case 'registro' :
        @$name      = $_GET['name'];
        @$lastname  = $_GET['lastname'];
        @$email     = $_GET['email'];
        @$code      = $_GET['code'];
        @$id        = $_GET['id'];
        @$career    = $_GET['career'];
        @$password  = $_GET['password'];
        @$passwordc = $_GET['passwordc'];
    
        $servicio   = new ServicioUsuario();
        $servicio->registro($name, $lastname, $email, $code, $id, $career, $password, $passwordc);
        break;

    case 'login' :
        @$email     = $_GET['email'];
        @$password      = $_GET['password'];
        $servicio   = new ServicioUsuario();
        $servicio->login($email, $password);
        break;

    case 'session' :
        $servicio   = new ServicioUsuario();
        $servicio->getSession();
        break;

    default :
        break; 
}

class ServicioUsuario {
    private $controlUsuario;

    public function __construct(){
        $this->controlUsuario = new ControlUsuario();
    }

    public function registro($name, $lastname, $email, $code, $id, $career, $password, $passwordc) {
        echo "exito([" . json_encode($this->controlUsuario->registrar($name, $lastname, $email, $code, $id, $career, $password, $passwordc)) . "])";
    }

    public function login($email, $password) {
        echo "Llegue aqui"
        $_SESSION['user'] = -1;
        $result = $this->controlUsuario->consultar($email, $password);
        if($result) {
            $_SESSION['user'] = $result;
        }
        echo "procesoLogin([" . json_encode($result) . "])";
    }

    public function getSession(){
        if(isset($_SESSION['user'])){
            echo "procesoInicio([".json_encode($_SESSION['user'])."])";
        } else {
            echo "procesoInicio([".json_decode(-1)."])";
        }
    }
}

?>