// Entry point: initialize scene, product, lighting, interaction, and animation loop
import { initScene } from './initScene.js';
import { createProduct } from './createProduct.js';
import { addLighting } from './addLighting.js';
import { setupInteraction } from './interaction.js';
import { setupAutoRotate } from './cameraAnimation.js';

// Initialize scene and controls
const { scene, camera, renderer, controls } = initScene('viewer');

// Build product and lighting
const { parts, product } = createProduct(scene);
addLighting(scene);

// Enable user interaction and auto-rotate camera
setupInteraction(scene, camera, renderer, parts);
setupAutoRotate(controls, 1);

// Animation loop
function animate() {
    // mesh animations: floating and pulsing
    const t = Date.now() * 0.001;
    // float up/down
    product.position.y = 0.1 * Math.sin(t);
    // pulse scale
    const s = 1 + 0.03 * Math.sin(t * 2);
    product.scale.set(s, s, s);

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();