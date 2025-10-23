import * as THREE from 'three';

class Scene {
  static create() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x21272e);

    // adiciona grid de referência
    //scene.add(new THREE.GridHelper());
    
    // neblina (névoa)
    scene.fog = new THREE.Fog(0xb4e137, 8, 20);

    return scene;
  }
}


export { Scene };
