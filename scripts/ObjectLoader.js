function loadObjMtl(nombre,modelo,material,aditionalParams){

  var ap = aditionalParams;
  cargador.addObj();

  console.log(ap);

  var onProgress = function( xhr ){
    if( xhr.lengthComputable ){
      var percentComplete = xhr.loaded / xhr.total * 100;
    }
  };

  var onError = function( xhr ){
      alert("Vamo a estresarno!");
  };

  var loader = new THREE.OBJMTLLoader();
  loader.load(modelo, material, function ( objeto ){

    if( "isPlayer" in ap ){
        var myObject = ( ap.isPlayer )? { player:ap.assignTo, obj: objeto } : { player:null, obj: objeto } ;
    }else{
      var myObject = { player:null, obj:objeto};
    }

    if( "position" in ap ){
      myObject.obj.position.set(ap.position.x,ap.position.y,ap.position.z);
    }

    if( "scale" in ap ){
      myObject.obj.scale.set(ap.scale,ap.scale,ap.scale);
    }
    if( "rotation" in ap ){
      console.log("entro");
      myObject.obj.rotation.set(ap.rotation.x, ap.rotation.y, ap.rotation.z);
    }
    if( "collidableDistance" in ap ){
      myObject.obj.collidableDistance = ap.collidableDistance;
    }

    console.log(material);
    cargador.objLoaded( nombre, myObject );
  });

}
