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

    addLightFolder(light, helper) {
        const initialLightPosition = light.position.clone();
        let lightLabel = "Light";
        if (light instanceof THREE.DirectionalLight) {
            lightLabel += " (Directional)";
        }
        const lightFolder = this.datGui.addFolder(lightLabel);
        lightFolder.add(light, "visible");
        lightFolder.add(light.position, "x", -10, 10);
        lightFolder.add(light.position, "y", -10, 10);
        lightFolder.add(light.position, "z", -10, 10);
        lightFolder.add(light, "castShadow");
        lightFolder.add(light, "intensity", 0, 1, 0.1);

        const controls = {
            resetLight: function () {
                light.position.copy(initialLightPosition);                
            },
        };

        if (helper !== null && helper !== undefined && helper !== "") {            
            lightFolder.add(helper, 'visible').name('Mostrar Helper');
        }
        

        lightFolder.add(controls, 'resetLight').name('Resetar Luz');
        lightFolder.open();

        return lightFolder;
    }
}



export { GuiControls };
