import * as THREE from 'three';

function createCube() {
  // create a geometry
  const geometry = new THREE.BoxGeometry(2, 2, 2);

  // create a default (white) Basic material
  const material = new THREE.MeshPhongMaterial();

  // create a Mesh containing the geometry and material
  const cube = new THREE.Mesh(geometry, material);

  return cube;
}

export { createCube };
