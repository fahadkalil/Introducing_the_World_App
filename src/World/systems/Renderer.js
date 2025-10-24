import * as THREE from 'three';

class Renderer {
  static create() {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    return renderer;
  }
}


export { Renderer };
