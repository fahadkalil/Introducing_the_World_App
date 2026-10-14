import * as THREE from 'three';

/*
* Classe que gera um disco sólido/maciço
*/

class SolidDisc {
    static create() {
        const points = [];
        
        // Parâmetros do descanso de copo
        const radius = 2.0;          // Raio total (4cm de diâmetro)
        const thickness = 0.15;     // Espessura total do descanso
        const rimWidth = 0.15;       // Largura da borda elevada lateral
        const indentDepth = 0.04;    // Profundidade do rebaixo central (onde o copo assenta)
        const smoothness = 6;        // Segmentos para arredondar as quinas

        const innerRadius = radius - rimWidth;

        // 1. Centro da base inferior
        points.push(new THREE.Vector2(0, 0));
        // 2. Linha reta até a quina inferior externa
        points.push(new THREE.Vector2(radius - 0.02, 0));

        // 3. Arredondamento da quina inferior externa para a parede lateral
        for (let i = 0; i <= smoothness; i++) {
            const angle = (i / smoothness) * (Math.PI / 2); // 0 a 90 graus
            const x = (radius - 0.02) + Math.sin(angle) * 0.02;
            const y = 0.02 - Math.cos(angle) * 0.02;
            points.push(new THREE.Vector2(x, y));
        }

        // 4. Subida da parede lateral externa até o topo da borda
        points.push(new THREE.Vector2(radius, thickness - 0.02));

        // 5. Arredondamento do topo da borda (o "lábio" superior)
        for (let i = 0; i <= smoothness; i++) {
            const angle = (i / smoothness) * Math.PI; // 0 a 180 graus (curva completa)
            const x = (radius - rimWidth / 2) + Math.sin(angle) * (rimWidth / 2);
            const y = (thickness - rimWidth / 2) + Math.cos(angle) * (rimWidth / 2);
            points.push(new THREE.Vector2(x, y));
        }

        // 6. Descida para o rebaixo interno (onde o copo vai ficar)
        const floorHeight = thickness - indentDepth;
        points.push(new THREE.Vector2(innerRadius, floorHeight + 0.02));

        // 7. Arredondamento da quina interna interna
        for (let i = 0; i <= smoothness; i++) {
            const angle = (i / smoothness) * (Math.PI / 2);
            const x = (innerRadius - 0.02) + Math.cos(angle) * 0.02;
            const y = floorHeight + Math.sin(angle) * 0.02;
            points.push(new THREE.Vector2(x, y));
        }

        // 8. Linha final até o centro interno
        points.push(new THREE.Vector2(0, floorHeight));

        // Rotaciona o perfil em 360 graus (64 segmentos para ficar bem liso)
        const geometry = new THREE.LatheGeometry(points, 64);
        
        const material = new THREE.MeshStandardMaterial({ 
            color: 0xcd853f, // Cor de cortiça/madeira clara
            roughness: 0.8,   // Bem fosco, sem reflexos espelhados
            metalness: 0.0
        });

        const coaster = new THREE.Mesh(geometry, material);
        coaster.castShadow = true;
        coaster.receiveShadow = true;

        coaster.position.z = 5;
        coaster.rotation.x = Math.PI; // em radianos
        
        return coaster;
    }
}

export { SolidDisc }