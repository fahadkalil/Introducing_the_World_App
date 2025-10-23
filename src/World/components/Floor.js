import * as THREE from 'three';

class Floor {
    static createBoxFloor(width = 10, height = 10, depth = 0.4) {
        const geometry = new THREE.BoxGeometry(width, height, depth);

        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2; // Rotate -90 degrees around the X-axis

        return mesh;
    }

    static createPlaneFloor(x = 10, y = 10,) {
        const geometry = new THREE.PlaneGeometry(width, height);

        const material = new THREE.MeshBasicMaterial({
            color: 0x808080,
            side: THREE.DoubleSide
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2; // Rotate -90 degrees around the X-axis

        return mesh;
    }
}

export { Floor };