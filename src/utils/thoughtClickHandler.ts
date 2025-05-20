import * as THREE from "three";
import { useAppStore } from "../stores/useAppStore";

export const thoughtClickHandler = (
  camera: THREE.Camera,
  canvas: HTMLCanvasElement | null,
  rotatingThoughts: THREE.Object3D[]
) => {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const handleClick = (event: MouseEvent) => {
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(rotatingThoughts, true);

    if (intersects.length > 0) {
      //raycaster find the clicked model
      const clickedModel = intersects[0].object;
      //find the clicked model's index
      const findRootGroup = (object: THREE.Object3D): THREE.Object3D => {
        while (object.parent && !rotatingThoughts.includes(object)) {
          object = object.parent;
        }
        return object;
      };

      const rootModel = findRootGroup(clickedModel);
      const index = rotatingThoughts.findIndex((m) => m === rootModel);
      //set selectedThought model and thought data(id,description...) in useAppstore
      const data = useAppStore.getState().thoughts[index];
      useAppStore.getState().setSelectedThought(clickedModel, data);
    }
  };

  return handleClick;
};
