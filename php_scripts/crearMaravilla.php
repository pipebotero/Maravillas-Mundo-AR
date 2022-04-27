<?php 

$server = "localhost";
$user = "root";
$pass = "";
$db = "maravillas_del_mundo";

// Create connection
$conn = new mysqli($server, $user, $pass, $db);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id= $_POST["idMaravilla"];
$nombre = $_POST["nombre"];
$descripcion = $_POST["descripcion"];
$idMusica = $_POST["idMusica"];
$idUbicacion = $_POST["idUbicacion"];
$idLinks = $_POST["idLinks"];

$modelo = $_FILES["modelo"];
$textura = $_FILES["textura"];
$uriModel = "http://localhost/compu-grafica/Maravillas-Mundo/models/".$modelo["name"];
$uriTextura = "http://localhost/compu-grafica/Maravillas-Mundo/models/".$textura["name"];


$sql = "INSERT INTO Maravilla (idMaravilla, nombre, modelo, textura, descripcion, idMusica, idUbicacion, idLinks) VALUES (".$id.", '".$nombre."', '".$uriModel."', '".$uriTextura."','".$descripcion."','".$idMusica."','".$idUbicacion."','".$idLinks."')";

if ($conn->query($sql) === TRUE) {
     echo "Record updated successfully"; 
 } else { 
     echo "Error updating record: " . $conn->error; 
 }

$conn->close();

 ?>