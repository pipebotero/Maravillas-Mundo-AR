var boolVolume = 1;
var percentage;


function leerMaravilla(num){
	$.ajax({
		url:"http://localhost/compu-grafica/Maravillas-Mundo/php_scripts/leerMaravilla.php",
		method:"POST",
		data: {idMaravilla: num}
	}).done(function(r){
		var json = JSON.parse(r);

		var texto;
		var texto2;
		if(json["Maravilla"]["descripcion"]==1){
			texto = contenido.descripciones[0].EstatuaLibertad;
			texto2 = contenido.descripciones[0].EstatuaLibertad2;
		}

		if(json["Maravilla"]["descripcion"]==2){
			texto = contenido.descripciones[0].TajMahal;
			texto2 = contenido.descripciones[0].TajMahal2;
		}

		if(json["Maravilla"]["descripcion"]==3){
			texto = contenido.descripciones[0].SidneyOpera;
			texto2 = contenido.descripciones[0].SidneyOpera2;
		}

		if(json["Maravilla"]["descripcion"]==4){
			texto = contenido.descripciones[0].TorreEiffel;
			texto2 = contenido.descripciones[0].TorreEiffel2;
		}


		if($("#info-left").length==0){
			$("#content-info").append("<div id='info-left'></div>");
			$("#info-left").append("<h2>"+json["Maravilla"]["nombre"]+"</h2>");
			$("#info-left").append("<div id='descripcion'>"+texto+"</div>");
			$("#info-left").append("<img id='maravillaIMG' src='./images/"+json["Maravilla"]["idMaravilla"]+"/1.jpg'>");
			$("#info-left").append("<div id='descripcion2'>"+texto2+"</div>");
			$("#descripcion p").attr('align','justify');
			$("#descripcion2 p").attr('align','justify');
		}

		if($("#info-link").length==0){	
			$("#content-info").append("<div id='info-link'><h4>Vea más en:</h4><a href='"+json["Links"]["link"]+"' target='_blank'>"+json["Maravilla"]["nombre"]+"</a></div>");
		}

		if($("#info-right").length==0){
			$("#content-info").append("<div id='info-right'></div>");
			$("#info-right").append("<h2>Ubicación: </h2>");
			$("#info-right").append("<h3>"+json["Ubicacion"]["ciudad"]+", "+json["Ubicacion"]["pais"]+"</h3>");
			$("#info-right").append("<img id='bandera' src='./images/"+json["Maravilla"]["idMaravilla"]+"/2.jpg'>");
		}

		if($("#musica").length==0){
			$("#content-info").append("<div id='musica'><img id='fotoArt' src='./images/"+json["Maravilla"]["idMaravilla"]+"/3.jpg'><audio controls id='audio'></audio></div>");
			$("#audio").append("<source src='"+json["Musica"]["src"]+"' type='audio/mp3'>");
			audio = document.getElementById("audio");
			audio.play();
		}
		
		
	}); 
};

function removerInfo(){
	if($("#info-left").length>0){
			$("#info-left").remove();
	}
	if($("#info-right").length>0){
			$("#info-right").remove();
	}
	if($("#info-link").length>0){
			$("#info-link").remove();
	}
	if($("#musica").length>0){
			audio.pause();
			//audio.currentTime = 0;
			$("#audio").remove();
			$("#musica").remove();
		}
	if($("#vol").length>0){
			$("#vol").remove();
		}
	if($(".volume").length>0){
			$(".volume").remove();
		}
};
