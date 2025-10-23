import * as THREE from 'three';

function createCamera() {
  const camera = new THREE.PerspectiveCamera(
    60, // fov = Field Of View
    1, // aspect ratio (dummy value)
    0.1, // near clipping plane
    1000, // far clipping plane
  );

  // move the camera back so we can view the scene
  camera.position.set(0, 7, 10);

  return camera;
}

export { createCamera };
