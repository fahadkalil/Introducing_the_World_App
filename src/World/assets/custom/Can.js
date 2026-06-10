import * as THREE from 'three';

/*
* Classe que gera uma Lata (can)
*/
class Can {
    static #createLid() {
        const lidCylinderGeometry = new THREE.CylinderGeometry(2.1,2.1,0.25,20,40);            
        const lidCylinderMaterial = new THREE.MeshLambertMaterial( { wireframe: false, color: 0xDCDFDE } );

        const lidCylinder = new THREE.Mesh( lidCylinderGeometry, lidCylinderMaterial );
        lidCylinder.castShadow = true;
        lidCylinder.receiveShadow = true;
        lidCylinder.position.y = 7.1;

        return lidCylinder;
    }

    static #createBody() {
        const cylinderGeometry = new THREE.CylinderGeometry(2,2,7,40,40,true);
        const cylinderMaterial = new THREE.MeshPhysicalMaterial( { 
            wireframe: false, 
            color: 0xFFFFFF,
            metalness: 1.0,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1
        } );

        const cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
        cylinder.castShadow = true;
        cylinder.receiveShadow = true;    
        cylinder.position.x = 0;
        cylinder.position.y = 3.5;
        cylinder.position.z = 0;

        return cylinder;
    }

    static #createBase() {
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

        return baseCircle;
    }

    static create() {
        this.lid = Can.#createLid();
        this.body = Can.#createBody();
        this.base = Can.#createBase();
        const _group = new THREE.Group();
        _group.add(this.lid, this.body, this.base);
        this.group = _group;
        
        return this;
    }
}

export { Can }