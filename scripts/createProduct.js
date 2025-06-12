// Creates a sample product composed of basic geometries and adds to the scene
import * as THREE from 'https://unpkg.com/three@0.152.2/build/three.module.js';

export function createProduct(scene) {
    const parts = {};
    // use orange material for product parts
    const material = new THREE.MeshStandardMaterial({ color: 0xffa500, metalness: 0.5, roughness: 0.4 });

    // group container for whole product
    const product = new THREE.Group();

    // Seat
    const seatGeo = new THREE.BoxGeometry(2, 0.2, 2);
    const seat = new THREE.Mesh(seatGeo, material);
    seat.position.set(0, 1, 0);
    product.add(seat);
    parts['Seat'] = seat;

    // Legs
    const legGeo = new THREE.CylinderGeometry(0.1, 0.1, 1, 16);
    const legPositions = [
        [-0.9, 0.5, -0.9], [0.9, 0.5, -0.9],
        [-0.9, 0.5, 0.9], [0.9, 0.5, 0.9]
    ];
    legPositions.forEach((pos, idx) => {
        const leg = new THREE.Mesh(legGeo, material);
        leg.position.set(pos[0], pos[1], pos[2]);
        product.add(leg);
        parts[`Leg ${idx+1}`] = leg;
    });

    // Backrest
    const backGeo = new THREE.BoxGeometry(2, 2, 0.2);
    const backrest = new THREE.Mesh(backGeo, material);
    backrest.position.set(0, 2, -0.9);
    product.add(backrest);
    parts['Backrest'] = backrest;

    // add group to scene and return parts and group reference
    scene.add(product);
    return { parts, product };
}