import * as THREE from "three";

const orbitMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});

export const createOrbitLines = (orbitRadius: number): THREE.Mesh => {
  const orbitThickness = orbitRadius - 0.01;
  const orbitGeo = new THREE.RingGeometry(orbitRadius, orbitThickness, 90);
  const orbitLineMesh = new THREE.Mesh(orbitGeo, orbitMaterial);
  //flip the line horizantally
  orbitLineMesh.rotation.x = Math.PI / 2;
  return orbitLineMesh;
  // scene.add(orbitLineMesh);
};
