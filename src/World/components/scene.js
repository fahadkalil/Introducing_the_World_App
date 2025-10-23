import * as THREE from 'three';

function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x21272e);
  scene.add(new THREE.GridHelper());

  return scene;
}

export { createScene };
