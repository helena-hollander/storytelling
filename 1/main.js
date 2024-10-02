import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import ModelLoader from '../modules/3dmodel';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

console.log('Hello from main.js');

const modelLoader = new ModelLoader();

var _canvasEl = document.getElementById("three");

//Var til repsonsiv window
var _vw = window.innerWidth;
var _vh = window.innerHeight;



//Create a scene:
const _scene = new THREE.Scene();
const _camera = new THREE.PerspectiveCamera(50, _vw / _vh, .1, 1000);
_scene.background = new THREE.Color(0x222222);
const _renderer = new THREE.WebGLRenderer({canvas: _canvasEl, antialias:true}); //antialias: true giver en blødere render
_renderer.setSize(_vw, _vh);
_renderer.setPixelRatio(window.devicePixelRatio); //Pixel ratio følge dvice
_renderer.setAnimationLoop(animate);
_renderer.shadowMap.enabled = true; //skygger i map
_renderer.shadowMap.type = THREE.PCFSoftShadowMap; //bløde skygger
//Visualiserer akserne x, y, z
const _axeshelper = new THREE.AxesHelper(2);
_scene.add(_axeshelper);


//LYS:
const _ambientlight = new THREE.AmbientLight(0xffffff, 2); //Her laver vi et ambient lys, der lyser hele scenen op, med en farve og en intensitet
_scene.add(_ambientlight); //Her tilføjer vi lyset til scenen


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
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    _cube = new THREE.Mesh(geometry, material);
    _cube.position.set(x, y, z);
    _cube.castShadow = true; //Her siger vi at vores kasse skal kaste skygger
  _cube.receiveShadow = true; //Her siger vi at vores kasse skal modtage skygger

    _scene.add(_cube);
    return _cube;
};

buildCube(0, 0, 0);

// modelLoader.loadModel('assets/3dmodels/deadbird.glb') //indsæt model
//     .then((model) => {
//         console.log('Model loaded successfully:', model);
//         // Add your rendering logic here
//     })
//     .catch((error) => {
//         console.error('Error loading model:', error);
//     });






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