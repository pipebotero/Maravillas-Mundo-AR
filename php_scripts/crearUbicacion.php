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

$id= $_POST["idUbicacion"];
$pais = $_POST["pais"];
$ciudad = $_POST["ciudad"];


$sql = "INSERT INTO Ubicacion (idUbicacion, pais, ciudad) VALUES (".$id.", '".$pais."', '".$ciudad."')";

if ($conn->query($sql) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();

 ?>