import { GUI } from 'dat.gui';
import * as THREE from 'three';

class GuiControls {
    constructor(datGui) {
        this.datGui = new GUI();
    }

    addCameraFolder(camera) {
        const initialCameraPosition = camera.position.clone();

        const cameraFolder = this.datGui.addFolder("Camera");
        cameraFolder.add(camera.position, "x", -10, 10);
        cameraFolder.add(camera.position, "y", -10, 10);
        cameraFolder.add(camera.position, "z", -10, 10);
        cameraFolder.add(camera, "fov", 0, 180, 0.01).onChange(() => {
            camera.updateProjectionMatrix();
        });
        cameraFolder.add(camera, "aspect", 0.00001, 10).onChange(() => {
            camera.updateProjectionMatrix();
        });
        cameraFolder.add(camera, "near", 0.01, 20).onChange(() => {
            camera.updateProjectionMatrix();
        });
        cameraFolder.add(camera, "far", 0.01, 100).onChange(() => {
            camera.updateProjectionMatrix();
        });

        const controls = {
            resetCamera: function () {
                camera.position.copy(initialCameraPosition);
                camera.lookAt(0, 0, 0);
            },
        };

        cameraFolder.add(controls, 'resetCamera').name('Resetar Camera');
        cameraFolder.open();

        return cameraFolder;
    }

    addLightFolder(light, helper = null) {
        const initialLightPosition = light.position.clone();
        let lightLabel = "Lights";

        const lightFolder = (this.datGui.__folders[lightLabel] === undefined) ? this.datGui.addFolder(lightLabel) : this.datGui.__folders[lightLabel];
        
        const innerFolder = this.#getLightInnerFolder(light, lightFolder);

        // Common light properties
        innerFolder.add(light, "visible");
        innerFolder.add(light, "intensity", 0, 1, 0.1);

        const colorSettings = {
            color: light.color.getHex(),
        };
        
        innerFolder.
            addColor(colorSettings, "color")
            .onChange((value) => {
                light.color.set(value);
            });


        // Specific light properties
        if (light instanceof THREE.DirectionalLight) {            
            innerFolder.add(light.position, "x", -10, 10);
            innerFolder.add(light.position, "y", -10, 10);
            innerFolder.add(light.position, "z", -10, 10);
            innerFolder.add(light, "castShadow");

            const controls = {
                resetLight: function () {
                    light.position.copy(initialLightPosition);
                }
            };

            innerFolder.add(controls, 'resetLight').name('Resetar Luz');
            innerFolder.add(helper, 'visible').name('Mostrar Helper');                     
        }

        lightFolder.open();
        innerFolder.open();

        return lightFolder;
    }

    #getLightInnerFolder(light, lightFolder) {        
        if (light instanceof THREE.AmbientLight) {
            return lightFolder.addFolder("Ambient Light");
        } else if (light instanceof THREE.DirectionalLight) {
            return lightFolder.addFolder("Directional Light");
        }
    }


}



export { GuiControls };
