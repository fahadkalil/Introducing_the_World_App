import * as THREE from "three";
import { Can } from './Can.js'

/*
* Classe que gera uma Lata com rótulo do Nescau
*/
class NescauCan extends Can {
    static create() {
        const can = super.create();
        can.body.material.dispose(); 

        const labelTexture = new THREE.TextureLoader().load('src/World/assets/textures/rotulo_nescau.png');    
        labelTexture.generateMipmaps = false; 
    
        const material = new THREE.MeshStandardMaterial({ map: labelTexture, transparent: true });

        can.body.material = material;

        return can;
    }
}

export { NescauCan }