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
    //Scene.setBackgroundColor(scene, 0x21272e); 

    // Load HDR environment for reflections
    new HDRLoader()
      .load('src/World/assets/textures/backgrounds/quarry_01_1k.hdr', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
				scene.environment = texture;
    },      
    (xhr) => { console.log((xhr.loaded / xhr.total * 100) + '% loaded'); },    
    (err) => { console.error('An error occurred loading the HDR:', err); }
    );

    mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // adiciona grid de referência
    Scene.addGridHelper(scene, 40, 40).helper.visible = true;

    // adiciona eixos de referência
    Scene.addAxesHelper(scene, 8).helper.visible = false;

    // adiciona helper da câmera
    Scene.addCameraHelper(scene, camera).helper.visible = false;

    /* const lidCylinderGeometry = new THREE.CylinderGeometry(2.1,2.1,0.25,20,40);    

    const lidCylinderMaterial = new THREE.MeshLambertMaterial( { wireframe: false, color: 0xDCDFDE } );
    const lidCylinder = new THREE.Mesh( lidCylinderGeometry, lidCylinderMaterial );
    lidCylinder.castShadow = true;
    lidCylinder.receiveShadow = true;

    lidCylinder.position.y = 7.1;

    const cylinderGeometry = new THREE.CylinderGeometry(2,2,7,40,40,true);
    const cylinderMaterial = new THREE.MeshPhysicalMaterial( { 
      wireframe: false, 
      color: 0xFFFFFF,
      metalness: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    } );    

    const stampTexture = new THREE.TextureLoader().load('src/World/assets/textures/rotulo_nescau.png');    
    stampTexture.generateMipmaps = false; 

    const cylinderMaterial2 = new THREE.MeshStandardMaterial({ map: stampTexture, transparent: true });

    const cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial2 );
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;

    cylinder.position.x = 0;
    cylinder.position.y = 3.5;
    cylinder.position.z = 0;
    
    const baseCircleGeometry = new THREE.CircleGeometry(2.1, 40);
    const baseCircleMaterial = new THREE.MeshPhysicalMaterial( { 
      wireframe: false, 
      color: 0xFFFFFF,
      metalness: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      side: THREE.DoubleSide
    } );
    const baseCircle = new THREE.Mesh( baseCircleGeometry, baseCircleMaterial );
    baseCircle.castShadow = true;
    baseCircle.receiveShadow = true;    
    baseCircle.rotation.x = -Math.PI / 2;
       
    mainGroup.add(lidCylinder)
    mainGroup.add(cylinder);
    mainGroup.add(baseCircle); */

    //const can = Can.create();
    const nescauCan = NescauCan.create();
    mainGroup.add(nescauCan.group);

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
    
    //guiControls.addAxesHelper(scene)
    guiControls.addCameraFolder(camera, controls);
    guiControls.addLightFolder(ambientLight);
    guiControls.addLightFolder(directionalLight, dlHelper);
    guiControls.addSceneFolder(scene);
  }

  render() {
    renderer.setAnimationLoop(() => {        
      mainGroup.rotation.y += 0.005;

      //controls.update();
      renderer.render(scene, camera);
    });
  }

}

export { World };
