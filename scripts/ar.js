/* ARUCO */

var video, canvas, context, imageData, detector, posit;
var modelSize = 35.0; //millimeters
var step = 0.0;
var dir = 0;

var zoom = 0.0;
var sZoom = 0;

var rotX =0, rotY =0, rotZ =0;
var rotBol = 0;

function onLoad(){
			video = document.getElementById("video");
      canvas = document.getElementById("canvas");
      context = canvas.getContext("2d");

      canvas.width = parseInt(canvas.style.width);
      canvas.height = parseInt(canvas.style.height);

      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      if (navigator.getUserMedia){
        init();
      }
}

function init(){
      navigator.getUserMedia({video:true},
        function (stream){
          if (window.webkitURL) {
            video.src = window.webkitURL.createObjectURL(stream);
          } else if (video.mozSrcObject !== undefined) {
            video.mozSrcObject = stream;
          } else {
            video.src = stream;
          }
        },
        function(error){
        }
      );

      detector = new AR.Detector();
      posit = new POS.Posit(modelSize, canvas.width);

      webGLStart();
    };

function snapshot(){
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      imageData = context.getImageData(0, 0, canvas.width, canvas.height);
};
