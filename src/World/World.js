import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { createSphere } from './components/sphere.js';
import { createScene } from './components/scene.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';


// These variables are module-scoped: we cannot access them
// from outside the module
let camera;
let renderer;
let scene;
let controls;
let cube;
let sphere;

class World {
  constructor(container) {
    camera = createCamera();    
    scene = createScene();
    renderer = createRenderer();    

    container.append(renderer.domElement);  

    cube = createCube();

    sphere = createSphere();
    sphere.position.x = 0;
    sphere.position.y = 1;
    sphere.position.z = 4;

    scene.add(cube);
    scene.add(sphere);

    const resizer = new Resizer(container, camera, renderer);

    // Permite controle da camera com mouse   
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.listenToKeyEvents(window);

  }

  render() {
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });    
  }
}

export { World };
