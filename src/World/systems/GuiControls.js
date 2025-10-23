import { GUI } from 'dat.gui';

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

    addLightFolder(light) {
        const initialLightPosition = light.position.clone();

        const lightFolder = this.datGui.addFolder("Light");
        lightFolder.add(light.position, "x", -10, 10);
        lightFolder.add(light.position, "y", -10, 10);
        lightFolder.add(light.position, "z", -10, 10);

        const controls = {
            resetLight: function () {
                light.position.copy(initialLightPosition);                
            },
        };

        lightFolder.add(controls, 'resetLight').name('Resetar Luz');
        lightFolder.open();

        return lightFolder;
    }
}



export { GuiControls };
