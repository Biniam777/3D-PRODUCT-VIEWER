// Adds ambient and directional lighting to the scene
import * as THREE from 'https://unpkg.com/three@0.152.2/build/three.module.js';

export function addLighting(scene) {
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    const directional = new THREE.DirectionalLight(0xffffff, 1);
    directional.position.set(5, 10, 7.5);
    directional.castShadow = true;
    scene.add(directional);
}