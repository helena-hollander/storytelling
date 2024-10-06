import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import GSAP from 'gsap';
import ThreeDModel from '../modules/3dmodel';
import GUI from 'lil-gui';  

console.log('Hello from main.js');


var _canvasEl = document.getElementById("three");

//Var til repsonsiv window
var _vw = window.innerWidth;
var _vh = window.innerHeight;


//Create a scene:
const _scene = new THREE.Scene();
const _camera = new THREE.PerspectiveCamera(50, _vw / _vh, .1, 1000);
_scene.background = new THREE.Color(0x4680b0);
const _renderer = new THREE.WebGLRenderer({canvas: _canvasEl, antialias:true}); //antialias: true giver en blødere render
_renderer.setSize(_vw, _vh);
_renderer.setPixelRatio(window.devicePixelRatio); //Pixel ratio følge dvice
_renderer.shadowMap.enabled = true; //skygger i map
_renderer.shadowMap.type = THREE.PCFSoftShadowMap; //bløde skygger
//Visualiserer akserne x, y, z
const _axeshelper = new THREE.AxesHelper(2);
_scene.add(_axeshelper);


//LYS:
const _ambientlight = new THREE.AmbientLight(0xffffff, 20); //Her laver vi et ambient lys, der lyser hele scenen op, med en farve og en intensitet
_scene.add(_ambientlight); //Her tilføjer vi lyset til scenen



//3dModel loader:
const powerPlant = new ThreeDModel('powerplant2blend.glb', 0, -35, -18, dtr(0), 0.7, THREE.MeshPhongMaterial, undefined, _scene);
const deadbird = new ThreeDModel('deadbirdhvid.glb', -10, 3, -10, dtr(0), 0.9, THREE.MeshPhongMaterial, undefined, _scene);
const deadbird2 = new ThreeDModel('deadbirdhvid.glb', 6, 0, -12, dtr(20), 0.5, THREE.MeshPhongMaterial, undefined, _scene);
const deadbird3 = new ThreeDModel('deadbird_lang.glb', 14, 0, -12, dtr(20), 0.2, THREE.MeshPhongMaterial, undefined, _scene);
const deadbird4 = new ThreeDModel('deadbird_lang2.glb', -8, -6, -14, dtr(20), 0.2, THREE.MeshPhongMaterial, undefined, _scene);
const deadbird5 = new ThreeDModel('deadbird_lang2.glb', 8, -8, -16, dtr(20), 0.18, THREE.MeshPhongMaterial, undefined, _scene);
//scene1.2
const deadbird6 = new ThreeDModel('deadbird_lang2.glb', 4, -28, -6, dtr(20), 1.2, THREE.MeshPhongMaterial, undefined, _scene);
//const blommetrae = new ThreeDModel('blommetrae_copy_oli.glb', 0, -6, -10, dtr(-190), 0.7, undefined, _scene); //evt gøt snot meget længere, exporter ny med textur. Og så bare behold alle atributes, men træk ned ad y-aksen.

const allThingsINedAnimated = [
powerPlant, deadbird, deadbird2, deadbird3, deadbird4, deadbird5, deadbird6
]

// const spacing = 40
// for(let i = 0; i < 200; i++){ 
//   const x = Math.random() * (spacing * 2) - spacing;
//   const y = Math.random() * (spacing * 2) - spacing;
//   const z = Math.random() * (spacing * 2) - spacing;
//   const newThing = new ThreeDModel('deadbirdhvid.glb', x, y, z, undefined, _scene);
//   allThingsINedAnimated.push(newThing);
// }

//CLOCK:
const clock = new THREE.Clock();


//ANIMATE


function animate() {
  _renderer.render(_scene, _camera);
  console.log("animate");

  const delta = clock.getDelta()
  allThingsINedAnimated.forEach((thing) => {
    if(thing._mixer){
      thing._mixer.update(delta);
    
    }
    
  })

  
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

//buildCube(0, 0, 0);







						


//Lil GUI:
const gui = new GUI();
const _Camfolder = gui.addFolder("Camera position");
_Camfolder.add(_camera.position, "x", -10, 10, 0.1);
_Camfolder.add(_camera.position, "y", -100, 0, 0.1);
_Camfolder.add(_camera.position, "z", -10, 10, 0.1);




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