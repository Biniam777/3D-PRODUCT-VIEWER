// Handles raycasting for mouse interaction and hover effects
import * as THREE from 'https://unpkg.com/three@0.152.2/build/three.module.js';

export function setupInteraction(scene, camera, renderer, parts) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const infoPanel = document.getElementById('infoPanel');
    let hoveredPart = null;

    function onPointerMove(event) {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(Object.values(parts));
        document.body.style.cursor = intersects.length ? 'pointer' : '';

        // subtle hover feedback: emissive highlight
        const newPart = intersects.length ? intersects[0].object : null;
        if (hoveredPart !== newPart) {
            if (hoveredPart) hoveredPart.material.emissive.set(0x000000);
            if (newPart) newPart.material.emissive.set(0x222222);
            hoveredPart = newPart;
        }
    }

    function onClick(event) {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(Object.values(parts));
        if (intersects.length) {
            const part = intersects[0].object;
            const name = Object.keys(parts).find(key => parts[key] === part);
            // visual feedback: scale part up briefly
            const originalScale = part.scale.clone();
            part.scale.multiplyScalar(1.2);
            setTimeout(() => part.scale.copy(originalScale), 300);
            // update info panel
            infoPanel.textContent = name;
            infoPanel.style.display = 'block';
        }
    }

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('click', onClick);
}