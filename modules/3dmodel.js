import * as THREE from 'three';
import GSAP from 'gsap';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'lil-gui';

export default class ThreeDModel {
  _3dmodel = null;
  _sceneRef;
  _position = { x: 0, y: 0, z: 0 };
  _rotation = { x: 0, y: 0, z: 0 };
  _scale = 1; 
  _mesh = null;
  _mixer = null;
  _offset = Math.round(Math.random() * 10);
  _that = this;
 

  constructor(modelUrl, x, y, z, rY, scale, mesh, sceneRef) {
    this.modelUrl = modelUrl;
    this._position.x = x;
    this._position.y = y;
    this._position.z = z;
    this._rotation.y = rY;
    this._scale = scale;
    this._mesh = mesh;
    this._sceneRef = sceneRef;
    this.loadModel();
  }

  loadModel() {
    const loader = new GLTFLoader();
    console.log('Loading model:', this.modelUrl);
    loader.load('../assets/3dmodels/' + this.modelUrl, (gltf) => {
      this._3dmodel = gltf.scene;
      this._mixer = new THREE.AnimationMixer(this._3dmodel);
      // this._mixer.clipAction(gltf.animations[0]).play();
      gltf.animations.forEach((clip) => {
        const action = this._mixer.clipAction(clip);
        action.time = this._offset;
        action.play();
      });
      this._3dmodel.position.set(this._position.x, this._position.y, this._position.z);
      this._3dmodel.rotation.set(0, this._rotation.y, 0);
      this._3dmodel.scale.set(this._scale, this._scale, this._scale);
      this._3dmodel.mesh = this._mesh;
      
    //  //Noget med mesh... og skygger 
    //  this._3dmodel.mesh.castShadow = true;
    //  this._3dmodel.mesh.receiveShadow = true;

      // Opret reference til class i userData
      this._3dmodel.userData = { class: this };

      //Load sound:
    


      this._sceneRef.add(this._3dmodel);
    }, undefined, (error) => {
      console.error('An error happened while loading the model:', error);
      if (error.target && error.target.responseText) {
        console.error('Server response:', error.target.responseText);
      }
    });
  }

  playSound(){
    console.log('playSound');
    
  }

}

