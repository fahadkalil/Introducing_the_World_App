import * as THREE from "three";

class Light {
  static createDirectionalLight(x = 5, y = 5, z = 4) {
    
    const light = new THREE.DirectionalLight();
    light.position.set(x, y, z).normalize();

    return light;
  }
}

export { Light };
