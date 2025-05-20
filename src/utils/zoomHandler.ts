import { gsap } from "gsap";
import * as THREE from "three";
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export const zoomInToModel = (
  camera: THREE.PerspectiveCamera,
  controls: OrbitControls,
  model: THREE.Object3D
) => {
  const target = new THREE.Vector3();
  model.getWorldPosition(target);

  gsap.to(camera.position, {
    x: target.x + 1.5,
    y: target.y + 1.2,
    z: target.z + 2,
    duration: 1.2,
    ease: "power2.inOut",
    onUpdate: () => {
      controls.update();
    },
  });

  controls.target.copy(target);
  controls.update();
};

export const zoomOutToDefault = (
  camera: THREE.PerspectiveCamera,
  controls: OrbitControls,
  defaultPosition: THREE.Vector3,
  defaultTarget: THREE.Vector3
) => {
  gsap.to(camera.position, {
    x: defaultPosition.x,
    y: defaultPosition.y,
    z: defaultPosition.z,
    duration: 1.2,
    ease: "power2.inOut",
    onUpdate: () => {
      controls.update();
    },
  });

  controls.target.copy(defaultTarget);
  controls.update();
};
