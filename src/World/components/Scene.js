import * as THREE from 'three';

class Scene {
  static create() {
    const scene = new THREE.Scene();

    return scene;
  }

  static setBackgroundColor(scene, color = 'lightgray') {
    scene.background = new THREE.Color(color);

    return scene;
  }

  static addGridHelper(scene, size = 10, divisions = 10) {    
    scene.add(new THREE.GridHelper(size, divisions));

    return scene;
  }

  static addFogLinear(scene, color = 0xFFFFFF, near = 1.0, far = 1000.0) {
    scene.fog = new THREE.Fog(color, near, far);

    return scene;
  }

  static addFogExp2(scene, color = 0xFFFFFF, density = 0.00025) {
    scene.fog = new THREE.FogExp2(color, density);

    return scene;
  }
}


export { Scene };
