import * as THREE from 'three';

function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x21272e);
  scene.add(new THREE.GridHelper());

  // iluminação
  const light = new THREE.DirectionalLight();
  light.position.set(5, 5, 4).normalize();
  scene.add(light);

  // neblina (névoa)
  scene.fog = new THREE.Fog(0xb4e137, 8, 20);

  return scene;
}

export { createScene };
