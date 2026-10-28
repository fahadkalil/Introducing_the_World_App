import * as THREE from "three";

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GuiControls } from './systems/GuiControls.js';

import { Camera } from './components/Camera.js';
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
let resizer;

let cube;
let sphere;
let torus;
let cylinder;

class Exercicio_01 {
  constructor(container) {
    camera = Camera.create();
    renderer = Renderer.create();
    container.append(renderer.domElement);
    resizer = new Resizer(container, camera, renderer);

    // Permite controle da camera com mouse e teclado  
    controls = new OrbitControls(camera, renderer.domElement);
    controls.listenToKeyEvents(window);
    //controls.enableDamping = true; // suaviza o movimento

    // Mostra controle de propriedades na tela (dat.GUI)
    const guiControls = new GuiControls();
    
    // -- SCENE init --    
    camera.position.set(0, 15, 30);    

    scene = Scene.create();    
    Scene.addGridHelper(scene, 40, 40).helper.visible = true; // adiciona grid de referência
    Scene.addAxesHelper(scene, 32).helper.visible = true; // adiciona eixos de referência
    Scene.addCameraHelper(scene, camera).helper.visible = false; // adiciona helper da câmera

    scene.background = new THREE.Color("lightgray");
   
    // adiciona piso (floor) com altura
    const floor = Floor.createPlaneFloor()
    floor.material.color.set('darkgray');
    scene.add(floor);

    // iluminação
    const ambientLight = Light.createAmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // objetos na cena!
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    
    guiControls.addCameraFolder(camera, controls);
    guiControls.addLightFolder(ambientLight);
    guiControls.addSceneFolder(scene);
    guiControls.datGui.open();
  }

  render() {
    renderer.setAnimationLoop(() => {        
      //mainGroup.rotation.y += 0.005;

      controls.update();
      renderer.render(scene, camera);
    });
  }

}

export { Exercicio_01 };
