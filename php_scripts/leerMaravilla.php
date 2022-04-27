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

$id = $_POST["idMaravilla"];

$sql = "SELECT * FROM Maravilla WHERE idMaravilla = ".$id.";";

//$sql = "SELECT * FROM Maravilla WHERE idMaravilla = 1;";

$result = $conn->query($sql);


if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
    	$json = array("idMaravilla" => $row["idMaravilla"], "nombre" => $row["nombre"], "modelo" => $row["modelo"], "textura" => $row["textura"], "descripcion" => $row["descripcion"], "idMusica" => $row["idMusica"], "idUbicacion" => $row["idUbicacion"], "idLinks" => $row["idLinks"]);
    	//echo json_encode($json,true);
    }

    $sql2 = "SELECT * FROM Musica WHERE idMusica = ".$json["idMusica"].";";

    $result2 = $conn->query($sql2);

    if ($result2->num_rows > 0) {

	    while($row = $result2->fetch_assoc()) {
	    	$json2 = array("idMusica" => $row["idMusica"], "nombre" => $row["nombre"], "src" => $row["src"]);
	    }

	}

	$sql3 = "SELECT * FROM Ubicacion WHERE idUbicacion = ".$json["idUbicacion"].";";

    $result3 = $conn->query($sql3);

    if ($result3->num_rows > 0) {

	    while($row = $result3->fetch_assoc()) {
	    	$json3 = array("idUbicacion" => $row["idUbicacion"], "pais" => $row["pais"], "ciudad" => $row["ciudad"]);
	    }

	}

	$sql4 = "SELECT * FROM Links WHERE idLinks = ".$json["idLinks"].";";

    $result4 = $conn->query($sql4);

    if ($result4->num_rows > 0) {

	    while($row = $result4->fetch_assoc()) {
	    	$json4 = array("idLinks" => $row["idLinks"], "link" => $row["link"]);
	    }

	}

	$jsonFinal["Maravilla"] = $json; $jsonFinal["Musica"]= $json2; $jsonFinal["Ubicacion"]= $json3; $jsonFinal["Links"]= $json4;
	echo json_encode($jsonFinal,true);
} else {
	$json = array("results" => "0");
    echo json_encode($json,false);
}


$conn->close();

?>