import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { createScene } from './components/scene.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// These variables are module-scoped: we cannot access them
// from outside the module
let camera;
let renderer;
let scene;
let controls;
let cube;

class World {
  constructor(container) {
    camera = createCamera();    
    scene = createScene();
    renderer = createRenderer();    

    container.append(renderer.domElement);  

    cube = createCube();

    scene.add(cube);

    const resizer = new Resizer(container, camera, renderer);

    // Permite controle da camera com mouse
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.listenToKeyEvents(window);

  }

  render() {
    renderer.render(scene, camera);
  } 

}

export { World };
