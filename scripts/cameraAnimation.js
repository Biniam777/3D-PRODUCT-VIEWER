// Sets up automatic camera rotation around the product using OrbitControls
export function setupAutoRotate(controls, speed = 1) {
    controls.autoRotate = true;
    controls.autoRotateSpeed = speed;
    // Pause auto-rotation on user drag, resume after
    controls.addEventListener('start', () => { controls.autoRotate = false; });
    controls.addEventListener('end', () => { controls.autoRotate = true; });
}