import * as THREE from "three";

class Light {
  static createDirectionalLight(x = 5, y = 5, z = 4) {
    
    const light = new THREE.DirectionalLight();
    light.position.set(x, y, z);

    return light;
  }

  static createDirectionalLightHelper(light, size = 5) {
    const helper = new THREE.DirectionalLightHelper(light, size);
    helper.visible = false;
    return helper;
  }


}

export { Light };
