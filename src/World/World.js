import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GuiControls } from './systems/GuiControls.js';

import { Camera } from './components/Camera.js';
import { Cube } from './components/Cube.js';
import { Sphere } from './components/Sphere.js';
import { Scene } from './components/Scene.js';

import { Floor } from './components/Floor.js';
import { Light } from './components/Light.js';

import { Renderer } from './systems/Renderer.js';
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
    camera = Camera.create();    
    
    scene = Scene.create();
    // adiciona piso (floor) com altura
    scene.add(Floor.createBoxFloor(10, 10, 0.4));

    // iluminação
    scene.add(Light.createDirectionalLight());

    renderer = Renderer.create();    

    container.append(renderer.domElement);  

    cube = Cube.create();
    cube.position.x = 0;
    cube.position.y = 2;
    cube.position.z = 0;

    sphere = Sphere.create();
    sphere.position.x = 0;
    sphere.position.y = 1;
    sphere.position.z = 4;

    scene.add(cube);
    scene.add(sphere);

    const resizer = new Resizer(container, camera, renderer);

    // Permite controle da camera com mouse e teclado  
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.listenToKeyEvents(window);

    // Mostra controle de propriedades na tela (dat.GUI)
    const guiControls = new GuiControls();
    guiControls.addCameraFolder(camera);
    guiControls.addLightFolder(light);
  }

  render() {
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });    
  }
}

export { World };
