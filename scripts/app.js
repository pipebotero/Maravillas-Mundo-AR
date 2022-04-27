var scene,camera,renderer;
var ultiTiempo;
var labels = [];
var objetos = [];
var appW = window.innerWidth; //* 0.75;
var appH = window.innerHeight;

var sounds = {};

var keys = {
	up: false,
	down: false,
	right: false,
	left: false,
	space: false,
	y: false,
	x:false
};


var cargador = {
	loadState: false,
	objsToLoad: 0,
	objsLoaded: 0,
	sceneIsReady: false,
	objLoaded: function(nombre,objeto){

		modelos[nombre] = objeto;

		console.log(modelos.LibertyStatue);
		this.objsToLoad--;
		this.objsLoaded++;

		var total = this.objsToLoad + this.objsLoaded;
		var porcentaje = ( this.objsLoaded / total ) * 100;
		if( porcentaje == 100 ){
			this.loadState = true;
		}
	},
	addObj: function(){
		this.objsToLoad++;
	}
};

var modelos = {};

var model;

var FLOOR = -250;

var suelo;


/* APP */
function webGLStart(){
	iniciarEscena();
	document.onkeydown = teclaPulsada;
	document.onkeyup = teclaSoltada;
	$( window ).resize(resizeApp);
	ultiTiempo = Date.now();
	animarEscena();
}

	function iniciarEscena(){

		renderer = new THREE.WebGLRenderer();
		renderer.setClearColor(0xffffff, 1);
		renderer.setSize(canvas.width, canvas.height);
		document.getElementById("container").appendChild(renderer.domElement);

		videoScene = new THREE.Scene();
		camera3 = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5);
		videoScene.add(camera3);

		scene = new THREE.Scene();
		camera4 = new THREE.PerspectiveCamera(40, canvas.width / canvas.height, 1, 1000);
		camera4.position.set(0,0,100);
		camera4.lookAt(new THREE.Vector3(0,0,0));
		scene.add(camera4);

		//controlCamara = new THREE.OrbitControls( camera4 , renderer.domElement );


		/*stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '160px';
		stats.domElement.style.left = '0px';
		document.body.appendChild(stats.domElement);*/

		videoTexture = createVideoTexture();
		videoScene.add(videoTexture);

		// LUCES 

		lAmbiente = new THREE.AmbientLight( 0xFFFFFF );

		
		var colorLuzPuntual = 0xFFFFB2;
		var intensidad = 1.5;
		var distancia = 200;

		lPuntual = new THREE.PointLight( colorLuzPuntual , intensidad, distancia );
		lPuntual.position.set(0,150,0);

		scene.add(lAmbiente,lPuntual);
		//videoScene.add(lAmbiente,lPuntual);



/*
		var object = new THREE.Object3D(),
				geometry = new THREE.SphereGeometry(0.5, 15, 15, Math.PI),
				texture = THREE.ImageUtils.loadTexture("textures/earth.jpg"),
				material = new THREE.MeshBasicMaterial( {map: texture} ),
				mesh = new THREE.Mesh(geometry, material);
		model = object.add(mesh);

		scene.add(model);

	*/	
		

		loadObjMtl('LibertyStatue','models/LibertStatue.obj', 'models/LibertStatue.mtl',{
			position: new THREE.Vector3(500,0,0),
			scale: 5,
			rotation: new THREE.Vector3(90,0,0)
		});

		loadObjMtl('Tajmahal','models/tajmahal.obj', 'models/tajmahal.mtl',{
			position: new THREE.Vector3(500,0,0),
			scale: 5
		});

		loadObjMtl('SydneyOpera','models/Sydney_Opera_House.obj', 'models/Sydney_Opera_House.mtl',{
			position: new THREE.Vector3(500,0,0),
			scale: 5
		});

		loadObjMtl('EiffelTower','models/eiffel_tower2.obj', 'models/eiffel_tower2.mtl',{
			position: new THREE.Vector3(500,0,0),
			scale: 5
		});
		

	}

	function createScene( geometry, materials, x, y, z, b ) {

				zmesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
				zmesh.position.set( x, y, z );
				zmesh.scale.set( 3, 3, 3 );
				scene.add( zmesh );

				//createMaterialsPalette( materials, 100, b );

			}

	function cargarModelos(){
		for (var i = 0; i < Object.keys(modelos).length; i++) {

			console.log(modelos);

			if( modelos[Object.keys(modelos)[i]]["player"] != null ){
				window[modelos[Object.keys(modelos)[i]]["player"]].setMesh(modelos[Object.keys(modelos)[i]]["obj"]);
				console.log(window[modelos[Object.keys(modelos)[i]]["player"]]);
				scene.add(window[modelos[Object.keys(modelos)[i]]["player"]]["mesh"]);
			}else{
				console.log(modelos[Object.keys(modelos)[i]]["obj"]);
				scene.add(modelos[Object.keys(modelos)[i]]["obj"]);
			}

		};
	}

	function animarEscena(){

		requestAnimationFrame(animarEscena);

		if (video.readyState === video.HAVE_ENOUGH_DATA){
			snapshot();

			if(!cargador.loadState && cargador.objsToLoad > 0){
				console.log("Obj Loaded : "+cargador.objsLoaded+" / "+(cargador.objsToLoad+cargador.objsLoaded));
			}else{
				if(!cargador.sceneIsReady){
					cargarModelos();
					cargador.sceneIsReady = true;
				}
				renderEscena();
				var markers = detector.detect(imageData);
				actualizarEscena(markers);
			}

		}

	}

	function renderEscena(){
		renderer.autoClear = false;
		renderer.clear();
		renderer.render(videoScene, camera3);
		renderer.render(scene, camera4);
	}

	function actualizarEscena(markers){

		//controlCamara.update();
		//stats.update();
		var corners, corner, pose, i;

		if (markers.length > 0){

			corners = markers[0].corners;

			for (i = 0; i < corners.length; ++ i){
				corner = corners[i];

				corner.x = corner.x - (canvas.width / 2);
				corner.y = (canvas.height / 2) - corner.y;
			}

			pose = posit.pose(corners);

			if(markers[0].id == "1"){
				updateObject(modelos.LibertyStatue.obj, pose.bestRotation, pose.bestTranslation);
				if(dir==1){
					modelos.LibertyStatue.obj.rotation.y += step;
				}else if(dir==-1){
					modelos.LibertyStatue.obj.rotation.y -= step;
				}

				if(sZoom==1){
					modelos.LibertyStatue.obj.scale.x += zoom;
					modelos.LibertyStatue.obj.scale.y += zoom;
					modelos.LibertyStatue.obj.scale.z += zoom;
				}else if(sZoom==-1){
					modelos.LibertyStatue.obj.scale.x -= zoom;
					modelos.LibertyStatue.obj.scale.y -= zoom;
					modelos.LibertyStatue.obj.scale.z -= zoom;
				}
				if(rotBol==1){
					modelos.LibertyStatue.obj.rotation.x = rotX;
					modelos.LibertyStatue.obj.rotation.y = rotY;
				}

				leerMaravilla(1);

			}
			if(markers[0].id == "2"){
				
				updateObject1(modelos.Tajmahal.obj, pose.bestRotation, pose.bestTranslation);
				if(dir==1){
					modelos.Tajmahal.obj.rotation.y += step;
				}else if(dir==-1){
					modelos.Tajmahal.obj.rotation.y -= step;
				}

				if(sZoom==1){
					modelos.Tajmahal.obj.scale.x += zoom;
					modelos.Tajmahal.obj.scale.y += zoom;
					modelos.Tajmahal.obj.scale.z += zoom;
				}else if(sZoom==-1){
					modelos.Tajmahal.obj.scale.x -= zoom;
					modelos.Tajmahal.obj.scale.y -= zoom;
					modelos.Tajmahal.obj.scale.z -= zoom;
				}
				if(rotBol==1){
					modelos.Tajmahal.obj.rotation.x = rotX;
					modelos.Tajmahal.obj.rotation.y = rotY;
				}

				leerMaravilla(2);
				
			}
			if(markers[0].id == "3"){
				
				updateObject(modelos.SydneyOpera.obj, pose.bestRotation, pose.bestTranslation);
				if(dir==1){
					modelos.SydneyOpera.obj.rotation.y += step;
				}else if(dir==-1){
					modelos.SydneyOpera.obj.rotation.y -= step;
				}

				if(sZoom==1){
					modelos.SydneyOpera.obj.scale.x += zoom;
					modelos.SydneyOpera.obj.scale.y += zoom;
					modelos.SydneyOpera.obj.scale.z += zoom;
				}else if(sZoom==-1){
					modelos.SydneyOpera.obj.scale.x -= zoom;
					modelos.SydneyOpera.obj.scale.y -= zoom;
					modelos.SydneyOpera.obj.scale.z -= zoom;
				}
				if(rotBol==1){
					modelos.SydneyOpera.obj.rotation.x = rotX;
					modelos.SydneyOpera.obj.rotation.y = rotY;
				}
				
				leerMaravilla(3);
			}

			if(markers[0].id == "4"){
				
				updateObject2(modelos.EiffelTower.obj, pose.bestRotation, pose.bestTranslation);
				if(dir==1){
					modelos.EiffelTower.obj.rotation.y += step;
				}else if(dir==-1){
					modelos.EiffelTower.obj.rotation.y -= step;
				}

				if(sZoom==1){
					modelos.EiffelTower.obj.scale.x += zoom;
					modelos.EiffelTower.obj.scale.y += zoom;
					modelos.EiffelTower.obj.scale.z += zoom;
				}else if(sZoom==-1){
					modelos.EiffelTower.obj.scale.x -= zoom;
					modelos.EiffelTower.obj.scale.y -= zoom;
					modelos.EiffelTower.obj.scale.z -= zoom;
				}
				if(rotBol==1){
					modelos.EiffelTower.obj.rotation.x = rotX;
					modelos.EiffelTower.obj.rotation.y = rotY;
				}
				
				
				leerMaravilla(4);
			}
			else{
				
			}


		}else{

			rotBol=0;

			resetObject(modelos.LibertyStatue.obj, 0, 500);
			resetObject(modelos.Tajmahal.obj, 0, 500);
			resetObject(modelos.SydneyOpera.obj, 0, 500);
			resetObject(modelos.EiffelTower.obj, 0, 500);

			removerInfo();


		}

		videoTexture.children[0].material.map.needsUpdate = true;

	}

	function updateObject(object, rotation, translation){
		object.scale.x = object.scale.y = object.scale.z = modelSize;

		object.rotation.x = -Math.asin(-rotation[1][2]) + (90* (Math.PI/180));
		object.rotation.y = -Math.atan2(rotation[0][2], rotation[2][2]);
		object.rotation.z = Math.atan2(rotation[1][0], rotation[1][1]);

		/*object.position.x = translation[0];
		object.position.y = translation[1];
		object.position.z = -translation[2];*/

		
		object.position.x = (translation[0]*0.6);
		object.position.y = (translation[1]*0.6);
		object.position.z = -(translation[2])+200;
		
	};

	function updateObject1(object, rotation, translation){
		object.scale.x = object.scale.y = object.scale.z = modelSize*3;

		object.rotation.x = -Math.asin(-rotation[1][2])+ (90* (Math.PI/180));
		object.rotation.y = -Math.atan2(rotation[0][2], rotation[2][2]);
		object.rotation.z = Math.atan2(rotation[1][0], rotation[1][1]);

		/*object.position.x = translation[0];
		object.position.y = translation[1];
		object.position.z = -translation[2];*/

		
		object.position.x = (translation[0]*0.6);
		object.position.y = (translation[1]*0.6);
		object.position.z = -(translation[2])+200;
		
	};

	function updateObject2(object, rotation, translation){
		object.scale.x = object.scale.y = object.scale.z = modelSize*0.5;

		object.rotation.x = -Math.asin(-rotation[1][2]);
		object.rotation.y = -Math.atan2(rotation[0][2], rotation[2][2]);
		object.rotation.z = Math.atan2(rotation[1][0], rotation[1][1]);
		
		object.position.x = (translation[0]*0.7);
		object.position.y = (translation[1]*0.6)+10;
		object.position.z = -(translation[2])+200;
		
	};



	function resetObject(object, rotation, translation){
		object.scale.x = object.scale.y = object.scale.z = modelSize;

		object.rotation.x = rotation;
		object.rotation.y = rotation;
		object.rotation.z = rotation;

		object.position.x = translation;
		object.position.y = translation;
		object.position.z = translation;
	};


	function createVideoTexture(){
		var texture = new THREE.Texture(video),
				object = new THREE.Object3D(),
				geometry = new THREE.PlaneGeometry(1.0, 1.0, 0.0),
				material = new THREE.MeshBasicMaterial( {map: texture, depthTest: false, depthWrite: false} ),
				mesh = new THREE.Mesh(geometry, material);

		object.position.z = -1;

		object.add(mesh);

		return object;
	};

function rotatarIzq(){
	rotBol = 0;
	dir = -1;	
	step += 0.1;

};

function rotatarDer(){
	rotBol = 0;
	dir = 1;	
	step += 0.1;

};

function zoomMenos(){

	if(sZoom==1){
		zoom=0.0;
	}

	sZoom = -1;
	zoom+=2;
};


function zoomMas(){

	if(sZoom==-1){
		zoom=0.0;
	}
	sZoom = 1;
	zoom+=2;
};


function luzDia(){
	var r=1,g=1,b=0.7;

	lPuntual.color.r=r;
	lPuntual.color.g=g;
	lPuntual.color.b=b;

	lAmbiente.color.r=1;
	lAmbiente.color.g=1;
	lAmbiente.color.b=1;
};
function luzNoche(){
	var r=0.4,g=0.4,b=1;

	lPuntual.color.r=r;
	lPuntual.color.g=g;
	lPuntual.color.b=b;

	lAmbiente.color.r=0.7;
	lAmbiente.color.g=0.7;
	lAmbiente.color.b=1;
};

function cameraReset(){
	rotBol = 1;
	rotX=90;
	rotY=0;
	rotZ=0;
}

function cameraTop(){
	rotBol = 1;
	rotX=90 * (Math.PI/180);
	rotY=0;
	rotZ=0;
};

function cameraBoT(){
	rotBol = 1;
	rotX=-90 * (Math.PI/180);
	rotY=0;
	rotZ=0;
};


function cameraFront(){
	rotBol = 1;
	rotX=0;
	rotY=0;
	rotZ=0;
};
function cameraBack(){
	rotBol = 1;
	rotX=0;
	rotY=180 * (Math.PI/180);
	rotZ=0;
};
function cameraLeft(){
	rotBol = 1;
	rotX=0;
	rotY=-90 * (Math.PI/180);
	rotZ=0;
};
function cameraRight(){
	rotBol = 1;
	rotX=0;
	rotY=90 * (Math.PI/180);
	rotZ=0;
};




//intencionalmente en blanco
