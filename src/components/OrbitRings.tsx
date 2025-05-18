//add orbit lines

const orbitMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});

const addOrbitLines = (orbitRadius) => {
  const orbitThickness = orbitRadius - 0.01;
  const orbitGeo = new THREE.RingGeometry(orbitRadius, orbitThickness, 90);
  const orbitLineMesh = new THREE.Mesh(orbitGeo, orbitMaterial);
  orbitLineMesh.rotation.x = Math.PI / 2;

  scene.add(orbitLineMesh);
};
