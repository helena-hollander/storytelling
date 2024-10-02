import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

console.log('Hello from main.js');

var _canvasEl = document.getElementById("three");

//Var til repsonsiv window
var _vw = window.innerWidth;
var _vh = window.innerHeight;

//Create a scene:
const _scene = new THREE.Scene();
const _camera = new THREE.PerspectiveCamera(50, _vw / _vh, .1, 1000);
const _renderer = new THREE.WebGLRenderer({canvas: _canvasEl}); 
_renderer.setSize(_vw, _vh);
_renderer.setAnimationLoop(animate);

//ANIMATE
function animate() {
    _renderer.render(_scene, _camera);
    console.log("animate");
}
_renderer.setAnimationLoop( animate );

//New _cube function

function buildCube(x, y, z){
    var _cube;
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    _cube = new THREE.Mesh(geometry, material);
    _cube.position.set(x, y, z);
    _scene.add(_cube);
    return _cube;
};

buildCube(0, 0, 0);








//INIT:
_camera.position.z = 5;


//dtr function
function dtr(d){
  return d * Math.PI / 180; 
};


//Funktion for resize
function resized(e){
  _vw = window.innerWidth;
  _vh = window.innerHeight;
//console.log(_vw, _vh);

  _camera.aspect = _vw /_vh; //Her følges vores camera og rnederer med vores vindue str., så det er responsivt
  _camera.updateProjectionMatrix();
  _renderer.setSize(_vw, _vh);
}

window.addEventListener("resize", resized);
resized(null);
//Hvis det virker og vi console.log(_vw, _vw); burde vi få en masse tal, der fortæller vinduets str. når vi ændrer den.

//Import orbit controls:
const _controls = new OrbitControls(_camera, _canvasEl);