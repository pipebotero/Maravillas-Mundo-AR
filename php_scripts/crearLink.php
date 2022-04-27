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

$id= $_POST["idLinks"];
$link = $_POST["link"];


$sql = "INSERT INTO Links (idLinks, link) VALUES (".$id.", '".$link."')";

if ($conn->query($sql) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();

 ?>