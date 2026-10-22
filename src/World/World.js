import * as THREE from "three";
import * as CANNON from "cannon-es";

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

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';

import { Can } from './assets/custom/Can.js'
import { NescauCan } from './assets/custom/NescauCan.js'

import { SolidDisc } from './assets/custom/SolidDisc.js'

// These variables are module-scoped: we cannot access them
// from outside the module
let camera;
let renderer;
let scene;
let controls;
let cube;
let sphere;
let resizer;
let mainGroup;

class World {
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

    //Scene.setBackgroundColor(scene, 0x21272e); 

    // carrega fundo com reflexos
    new HDRLoader()
      .load('src/World/assets/textures/backgrounds/quarry_01_1k.hdr', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
				scene.environment = texture;
    },      
    (xhr) => { console.log((xhr.loaded / xhr.total * 100) + '% loaded'); },    
    (err) => { console.error('An error occurred loading the HDR:', err); }
    );

    // define grupo de objetos principal
    mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // cria lata de nescau
    const nescauCan = NescauCan.create();

    // cria disco sólido (similar a uma tampa)
    const solidDisc = SolidDisc.create();
    solidDisc.position.z = 5;
    solidDisc.position.y = 10;
    solidDisc.rotation.x = Math.PI; // em radianos

    mainGroup.add(nescauCan.group);
    mainGroup.add(solidDisc);

    // adiciona piso (floor) com altura
    //const floor = Floor.createPlaneFloor()
    //floor.material.color.set('lightgray');
    //mainGroup.add(floor);

    // iluminação
    const ambientLight = Light.createAmbientLight(0xffffff, 0.5);
    mainGroup.add(ambientLight);

    const directionalLight = Light.createDirectionalLight(2.5, 8, 8, 0xffffff, 1);

    // adiciona helper da iluminação
    const dlHelper = Light.createDirectionalLightHelper(directionalLight, 3);
    dlHelper.visible = true;

    // iluminar um objeto específico
    //directionalLight.target = lidCylinder;

    mainGroup.add(directionalLight, dlHelper);   
    
    guiControls.addCameraFolder(camera, controls);
    guiControls.addLightFolder(ambientLight);
    guiControls.addLightFolder(directionalLight, dlHelper);
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

export { World };
