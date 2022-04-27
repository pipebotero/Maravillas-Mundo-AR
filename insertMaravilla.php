<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="UTF-8">
		<title></title>
		<link rel="stylesheet" href="">
	</head>
	<body>
		<header>
			<h1>Inserte una nueva Ubicación</h1>
		</header>

		<form action="http://localhost/compu-grafica/Maravillas-Mundo/php_scripts/crearMaravilla.php" accept-charset="utf-8" method="POST" enctype="multipart/form-data">
			<input type="number" name="idMaravilla" value="" placeholder="id">
			<input type="text" name="nombre" value="" placeholder="Nombre">
			<input type="text" name="descripcion" value="" placeholder="Descripcion">
			<input type="number" name="idMusica" value="" placeholder="idMusica">
			<input type="number" name="idUbicacion" value="" placeholder="idUbicacion">
			<input type="number" name="idLinks" value="" placeholder="idLinks">
			<label>Modelo:</label>
			<input type="file" name="modelo" value="" placeholder="Modelo">
			<label>Textura:</label>
			<input type="file" name="textura" value="" placeholder="Textura">
            <input type="submit" value="Insertar">
		</form>
		<footer></footer>
	</body>
</html>

