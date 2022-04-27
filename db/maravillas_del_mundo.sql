-- phpMyAdmin SQL Dump
-- version 4.4.12
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 09-06-2016 a las 09:23:05
-- Versión del servidor: 5.6.25
-- Versión de PHP: 5.6.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `maravillas_del_mundo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Links`
--

CREATE TABLE IF NOT EXISTS `Links` (
  `idLinks` int(11) NOT NULL,
  `link` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `Links`
--

INSERT INTO `Links` (`idLinks`, `link`) VALUES
(1, 'https://es.wikipedia.org/wiki/Estatua_de_la_Libertad'),
(2, 'https://es.wikipedia.org/wiki/Taj_Mahal'),
(3, 'https://en.wikipedia.org/wiki/Sydney_Opera_House'),
(4, 'https://es.wikipedia.org/wiki/Torre_Eiffel');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Maravilla`
--

CREATE TABLE IF NOT EXISTS `Maravilla` (
  `idMaravilla` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `modelo` varchar(100) DEFAULT NULL,
  `textura` varchar(100) DEFAULT NULL,
  `descripcion` int(11) DEFAULT NULL,
  `idMusica` int(11) NOT NULL,
  `idUbicacion` int(11) NOT NULL,
  `idLinks` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `Maravilla`
--

INSERT INTO `Maravilla` (`idMaravilla`, `nombre`, `modelo`, `textura`, `descripcion`, `idMusica`, `idUbicacion`, `idLinks`) VALUES
(1, 'Estatua de la Libertad', 'http://localhost/compu-grafica/Maravillas-Mundo/models/LibertStatue.obj', 'http://localhost/compu-grafica/Maravillas-Mundo/models/LibertStatue.mtl', 1, 1, 1, 1),
(2, 'Taj Mahal', 'http://localhost/compu-grafica/Maravillas-Mundo/models/tajmahal.obj', 'http://localhost/compu-grafica/Maravillas-Mundo/models/tajmahal.mtl', 2, 2, 2, 2),
(3, 'Opera de Sidney', 'http://localhost/compu-grafica/Maravillas-Mundo/models/Sydney_Opera_House.obj', 'http://localhost/compu-grafica/Maravillas-Mundo/models/Sydney_Opera_House.mtl', 3, 3, 3, 3),
(4, 'Torre Eiffel', 'http://localhost/compu-grafica/Maravillas-Mundo/models/eiffel_tower2.obj', 'http://localhost/compu-grafica/Maravillas-Mundo/models/eiffel_tower2.mtl', 4, 4, 4, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Musica`
--

CREATE TABLE IF NOT EXISTS `Musica` (
  `idMusica` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `duracion` int(11) DEFAULT NULL,
  `src` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `Musica`
--

INSERT INTO `Musica` (`idMusica`, `nombre`, `duracion`, `src`) VALUES
(1, 'New York, New York', 214, 'http://localhost/compu-grafica/Maravillas-Mundo/musica/Frank Sinatra-New York,New York-Lyrics.mp3'),
(2, 'India Music', 195, 'http://localhost/compu-grafica/Maravillas-Mundo/musica/Beautiful India Music - Taj Mahal.mp3'),
(3, 'Beethoven Quinta Sinfonia', 623, 'http://localhost/compu-grafica/Maravillas-Mundo/musica/Beethoven Quinta Sinfonia.mp3'),
(4, ' Carla Bruni L amour', 194, 'http://localhost/compu-grafica/Maravillas-Mundo/musica/Carla Bruni - L amour.mp3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Ubicacion`
--

CREATE TABLE IF NOT EXISTS `Ubicacion` (
  `idUbicacion` int(11) NOT NULL,
  `pais` varchar(45) DEFAULT NULL,
  `ciudad` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `Ubicacion`
--

INSERT INTO `Ubicacion` (`idUbicacion`, `pais`, `ciudad`) VALUES
(1, 'Estados Unidos', 'Nueva York'),
(2, 'India', 'Agra'),
(3, 'Australia', 'Sidney'),
(4, 'Francia', 'Paris');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Links`
--
ALTER TABLE `Links`
  ADD PRIMARY KEY (`idLinks`);

--
-- Indices de la tabla `Maravilla`
--
ALTER TABLE `Maravilla`
  ADD PRIMARY KEY (`idMaravilla`),
  ADD KEY `fk_Maravilla_Musica_idx` (`idMusica`),
  ADD KEY `fk_Maravilla_Ubicacion1_idx` (`idUbicacion`),
  ADD KEY `fk_Maravilla_Links1_idx` (`idLinks`);

--
-- Indices de la tabla `Musica`
--
ALTER TABLE `Musica`
  ADD PRIMARY KEY (`idMusica`);

--
-- Indices de la tabla `Ubicacion`
--
ALTER TABLE `Ubicacion`
  ADD PRIMARY KEY (`idUbicacion`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Maravilla`
--
ALTER TABLE `Maravilla`
  ADD CONSTRAINT `fk_Maravilla_Links1` FOREIGN KEY (`idLinks`) REFERENCES `Links` (`idLinks`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Maravilla_Musica` FOREIGN KEY (`idMusica`) REFERENCES `Musica` (`idMusica`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Maravilla_Ubicacion1` FOREIGN KEY (`idUbicacion`) REFERENCES `Ubicacion` (`idUbicacion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
