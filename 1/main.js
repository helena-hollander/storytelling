import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import GSAP from 'gsap';
import ThreeDModel from '../modules/3dmodel';
import GUI from 'lil-gui';  
import WheelFunction from '../modules/wheelFunction';
import { EffectComposer } from 'three/examples/jsm/Addons.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'; //Effects
import {FilmPass} from 'three/examples/jsm/postprocessing/FilmPass.js'; //Effects

console.log('Hello from main.js');


var _canvasEl = document.getElementById("three");

//Var til repsonsiv window
var _vw = window.innerWidth;
var _vh = window.innerHeight;

//Mouse move påvirker cam.rotation.y
let targetRotationY = 0;
let currentRotationY = 0;

document.addEventListener('mousemove', onMouseMove, false);

let mouseX = 0;
const windowHalfX = window.innerWidth / 2;

function onMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) / windowHalfX;
  targetRotationY = mouseX * -0.1; // Adjust the multiplier to control the rotation speed
}


//Create a scene:
const _scene = new THREE.Scene();
const fogColor = new THREE.Color(0x0c0c57);
_scene.fog = new THREE.Fog(fogColor, 5, 290); //Fog i scene
const _camera = new THREE.PerspectiveCamera(50, _vw / _vh, .1, 1000);
//LYD
const listener = new THREE.AudioListener();
_camera.add( listener );

_scene.background = new THREE.Color(0x0c0c57);
const _renderer = new THREE.WebGLRenderer({canvas: _canvasEl, antialias:true}); //antialias: true giver en blødere render
_renderer.setSize(_vw, _vh);
_renderer.setPixelRatio(window.devicePixelRatio); //Pixel ratio følge dvice
_renderer.shadowMap.enabled = true; //skygger i map
_renderer.shadowMap.type = THREE.PCFSoftShadowMap; //bløde skygger
//Visualiserer akserne x, y, z
//const _axeshelper = new THREE.AxesHelper(2);
// _scene.add(_axeshelper);

//Effect composer:
const _composer = new EffectComposer(_renderer);
const renderPass = new RenderPass(_scene, _camera); //Her laver vi en renderpass, der render vores scene og kamera
_composer.addPass(renderPass); //Her tilføjer vi renderpassen til vores composer

//Film effect:
const _filmPass = new FilmPass(6, false); //intensitet, grayscale
_composer.addPass(_filmPass); //Her tilføjer vi film passen til vores composer




//LYS:
const _ambientlight = new THREE.AmbientLight(0x1b1178, 1.5); //Her laver vi et ambient lys, der lyser hele scenen op, med en farve og en intensitet
//_scene.add(_ambientlight); //Her tilføjer vi lyset til scenen
const _dirLight = new THREE.DirectionalLight(0x9238b5, 10); //Her laver vi et retningsbestemt lys, med en farve og en intensitet
_dirLight.position.set(10, -300, 10); //Her bestemmer vi lyskildens position
_dirLight.castShadow = true; //Her siger vi at vores lys skal kaste skygger
_dirLight.setSize = 3000;
_scene.add(_dirLight); //Her tilføjer vi lyset til scenen


const _dirLight3 = new THREE.DirectionalLight(0x29388c, 10);
_dirLight3.position.set(-20, 0, -50);
_dirLight3.rotateY(dtr(90));
_dirLight3.castShadow = true;
_scene.add(_dirLight3);

// const _dirLight2 = new THREE.DirectionalLight(0xe6a9f5, 7); //Her laver vi et retningsbestemt lys, med en farve og en intensitet
// _dirLight2.position.set(8, -100, -5); //Her bestemmer vi lyskildens position
// _dirLight2.castShadow = true; //Her siger vi at vores lys skal kaste skygger
// _dirLight2.setSize = 1000;
// //_scene.add(_dirLight2); //Her tilføjer vi lyset til scenen

const _dirLight3Helper = new THREE.DirectionalLightHelper(_dirLight3, 1);
//_scene.add(_dirLight3Helper);


//3dModel loader:
const powerPlant = new ThreeDModel('powerplantbirds_red.glb', 0, -85, -68, dtr(0), 2, THREE.MeshPhongMaterial, undefined, 'whistleL.mp3', undefined, _scene);
const powerPlant2 = new ThreeDModel('powerplantbirds2.glb', -6, -75, -4, dtr(0), 1.2, THREE.MeshPhongMaterial, undefined, 'whistleR.mp3', undefined, _scene);
//const powerPlant3 = new ThreeDModel('powerplantbirds2.glb', 86, -115, -164, dtr(0), 1.5, THREE.MeshPhongMaterial, 'whistleR.mp3', undefined, undefined, _scene);
const powerPlant4 = new ThreeDModel('powerplantbirds_red2.glb', -86, -15, -204, dtr(0), 1.6, THREE.MeshPhongMaterial, undefined, undefined, undefined, _scene);
const deadbird = new ThreeDModel('deadbird.glb', -70, 3, -90, dtr(0), 1, THREE.MeshPhongMaterial, 'end_ah_7.mp3', undefined, undefined, _scene);
const deadbird2 = new ThreeDModel('deadbird.glb', 16, 10, -46, dtr(20), 1, THREE.MeshPhongMaterial, 'end_ah_5.mp3', undefined, undefined, _scene);
const deadbird3 = new ThreeDModel('deadbird.glb', 24, 0, -172, dtr(20), 1, THREE.MeshPhongMaterial, 'end_ah_4.mp3', undefined, undefined, _scene);
const deadbird4 = new ThreeDModel('deadbird.glb', -38, -36, -184, dtr(20), 1, THREE.MeshPhongMaterial,'end_ah_7.mp3',  undefined, undefined, _scene);
const deadbird5 = new ThreeDModel('deadbird.glb', 18, -18, -16, dtr(20), 1, THREE.MeshPhongMaterial, 'end_ah_6.mp3', undefined, undefined, _scene);
//scene1.2
const deadbird6 = new ThreeDModel('deadbird.glb', 4, -28, -6, dtr(20), 1.2, THREE.MeshPhongMaterial, 'end_ah.mp3', undefined, undefined, _scene);
const deadbird7 = new ThreeDModel('deadbird.glb', -8, -34, -16, dtr(20), 0.8, THREE.MeshPhongMaterial, 'end_ah_2.mp3', undefined, undefined, _scene);
const deadbird8 = new ThreeDModel('deadbird.glb', -68, -134, -116, dtr(20), 0.9, THREE.MeshPhongMaterial, 'end_ah_7.mp3', undefined, undefined, _scene);
const deadbird9 = new ThreeDModel('deadbird.glb', 68, -104, -176, dtr(20), 0.9, THREE.MeshPhongMaterial, 'end_ah_6.mp3', undefined, undefined, _scene);
const deadbird10 = new ThreeDModel('deadbird.glb', 88, -54, -206, dtr(20), 0.8, THREE.MeshPhongMaterial, 'end_ah_6.mp3', undefined, undefined, _scene);
const tricycle = new ThreeDModel('tricycle.glb', 0, -184, -20, dtr(-45), 1.5, THREE.MeshPhongMaterial, 'laugh_cry_R1.mp3', undefined, 'laugh_cry_L1.mp3',  _scene);
const car = new ThreeDModel('car.glb', -30, -184, -75, dtr(0), 2.5, THREE.MeshPhongMaterial, 'carcrash.mp3', undefined, undefined, _scene);
const blommetrae = new ThreeDModel('blommetrae_lang.glb', 10, -254, -35, dtr(-180), 2.2, THREE.MeshPhongMaterial, 'klikR.mp3', 'laugh_cry_creep.mp3', 'klikL.mp3', _scene);


const allThingsINedAnimated = [
powerPlant, powerPlant2,
//powerPlant3,
powerPlant4, 
deadbird, deadbird2, deadbird3, deadbird4, deadbird5, deadbird6, deadbird7, deadbird8, deadbird9, deadbird10, 
tricycle, car, blommetrae, 
]


// const spacing = 40
// for(let i = 0; i < 200; i++){ 
  //   const x = Math.random() * (spacing * 2) - spacing;
  //   const y = Math.random() * (spacing * 2) - spacing;
  //   const z = Math.random() * (spacing * 2) - spacing;
  //   const newThing = new ThreeDModel('deadbirdhvid.glb', x, y, z, undefined, _scene);
  //   allThingsINedAnimated.push(newThing);
  // }


//RAYCASTER (kampen med Karsten):
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  
  document.addEventListener('click', (event) => {
    const meshes = allThingsINedAnimated.map((thing) => thing._3dmodel);
    
    // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  mouse.x = ( event.clientX / _vw ) * 2 - 1;
  mouse.y = - ( event.clientY / _vh ) * 2 + 1;
  raycaster.setFromCamera(mouse, _camera);
  const intersects = raycaster.intersectObjects(meshes, true);
  if(intersects.length > 0){
    // rekursivt finde den første ting der har en userData property der hedder class
    function findUserData(obj){
      if(obj.userData.class){
        return obj.userData.class;
      }
      if(obj.parent){
        return findUserData(obj.parent);
      }
    }
    // console.log(intersects[0].object);
    const thing = findUserData(intersects[0].object);
    // console.log(thing);
    thing.playSound();


    console.log(intersects);
    // const thing = allThingsINedAnimated.find((thing) => thing._3dmodel === intersects[0].object);
    // if(thing){
    //   console.log(thing);
    //   if(thing._lyd){
    //     thing._lyd.play();
    //   }
    // }
  }
})

//CLOCK:
const clock = new THREE.Clock();

//Scroll ned på y-aksen:
const wheelFunction = new WheelFunction(_camera);

//BG sound:
function playBgSound(){
  console.log('playBgSound');
  var soundBg = new Howl({
    src: [`../assets/sounds/electric_wind.mp3`],
    loop: true,
    volume: 0.08
  });
  soundBg.play();
}
playBgSound();

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
  const cameraTargetPosition = new THREE.Vector3(0, wheelFunction._camY, 0); //Ease på scroll
  _camera.position.lerp(cameraTargetPosition, 0.05); //Hvor smooth det går

  //Musen og cam rotate.y
  currentRotationY = THREE.MathUtils.lerp(currentRotationY, targetRotationY, 0.08); //Hvor smooth den går
  _camera.rotation.y = currentRotationY;

  _composer.render(); //Her render vi vores composer, så vi kan bruge vores postprocessing effekter.
  
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
//const gui = new GUI();
// const _Camfolder = gui.addFolder("Camera position");
// _Camfolder.add(_camera.position, "x", -10, 10, 0.1);
// _Camfolder.add(_camera.position, "y", -200, 0, 0.1);
// _Camfolder.add(_camera.position, "z", -10, 10, 0.1);

const _DirLightFolder = gui.addFolder("Directional Light");
_DirLightFolder.add(_dirLight3.position, "x", -100, 20, 0.1);
_DirLightFolder.add(_dirLight3.position, "y", -20, 20, 0.1);
_DirLightFolder.add(_dirLight3.position, "z", -200, 20, 0.1);
_DirLightFolder.add(_dirLight3, "intensity", 0, 100, 0.1);





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
//const _controls = new OrbitControls(_camera, _canvasEl);