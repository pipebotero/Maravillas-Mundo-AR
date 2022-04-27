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

$id= $_POST["idMusica"];
$nombre = $_POST["nombre"];
$src = $_FILES["src"];
$uri = "http://localhost/compu-grafica/Maravillas-Mundo/musica/".$src["name"];


$sql = "INSERT INTO Musica (idMusica, nombre, src) VALUES (".$idMusica.", '".$nombre."', '".$uri."')";

if ($conn->query($sql) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();

 ?>