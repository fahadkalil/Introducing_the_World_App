import * as THREE from "three";

function createSphere() {
  // create a geometry
  const geometry = new THREE.SphereGeometry(0.7, 30, 30);

  // create a default (white) Basic material
  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shininess: 50,
  });

  // create a Mesh containing the geometry and material
  const sphere = new THREE.Mesh(geometry, material);

  return sphere;
}

export { createSphere };
