import * as THREE from 'three';

export default class WheelFunction {
  _camY = null
  _camera;
  constructor(camera) {
    this._camera = camera;
    this._camY = this._camera.position.y;
    this.start();
  }

  start(){
    document.addEventListener("wheel", this.scrollCamY.bind(this)); //Lytter efter scroll på y-aksen, til _cam
  }

  scrollCamY(event){
    this._camY -= event.deltaY * 0.01; //Hastighed på scroll
    console.log(this)
    if(this._camY > 0){ 
      this._camY = 0;
    } //Her sikrer vi os, at _camY ikke kan være over 0.
   
    console.log(this._camY);  
  }

  stop(){
    document.removeEventListener("wheel", this.scrollCamY);
  }

};
