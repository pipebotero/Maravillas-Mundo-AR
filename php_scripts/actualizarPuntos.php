<?php
	$server = "localhost";
	$user = "root";
	$pass = "";
	$db = "mi_juego";

	// Create connection
	$conn = new mysqli($server, $user, $pass, $db);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}
	$current_date = date('Y-m-d H:i:s');


	$sql = "UPDATE jugadores SET vidas='".$_POST["vidas"]."', puntos='".$_POST["puntos"]."', fecha='".$current_date."' WHERE username='".$_POST["player"]."'";

	if ($conn->query($sql) === TRUE) {
	    echo "Record updated successfully";
	} else {
	    echo "Error updating record: " . $conn->error;
	}

	$conn->close();
?>
