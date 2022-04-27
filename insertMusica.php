<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="UTF-8">
		<title></title>
		<link rel="stylesheet" href="">
	</head>
	<body>
		<header>
			<h1>Inserte una nueva canción</h1>
		</header>

		<form action="http://localhost/compu-grafica/Maravillas-Mundo/php_scripts/crearMusica.php" accept-charset="utf-8" method="POST" enctype="multipart/form-data">
			<input type="number" name="idMusica" value="" placeholder="id">
			<input type="text" name="nombre" value="" placeholder="Nombre">
			<label>Musica:</label>
			<input type="file" name="src" value="" placeholder="">
            <input type="submit" value="Insertar">
		</form>
		<footer></footer>
	</body>
</html>

