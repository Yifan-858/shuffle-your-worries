import { gltfLoader } from "../utils/gltfLoader";

//add face expression
let selectedFace;
const facePath = ["face1.glb", "face2.glb", "face3.glb"];
let currentFacePath = facePath[0];
let currentFaceMesh = null;
let preloadedFaces = {};

gltfLoader.load(currentFacePath, function (glb) {
  currentFaceMesh = glb.scene;
  scene.add(currentFaceMesh);
  currentFaceMesh.position.set(0.045, -1, 0);
});

const preloadFaces = () => {
  facePath.forEach((path) => {
    gltfLoader.load(path, function (glb) {
      preloadedFaces[path] = glb.scene; // Save the loaded scene
    });
  });
};

preloadFaces();
const updateFace = () => {
  if (rotatingMeshes.length >= 0 && rotatingMeshes.length <= 1) {
    selectedFace = facePath[0];
  } else if (rotatingMeshes.length > 1 && rotatingMeshes.length <= 5) {
    selectedFace = facePath[1];
  } else {
    selectedFace = facePath[2];
  }

  if (currentFacePath !== selectedFace) {
    scene.remove(currentFaceMesh);
    currentFaceMesh = null;

    currentFaceMesh = preloadedFaces[selectedFace].clone(); // Clone to avoid sharing
    scene.add(currentFaceMesh);
    currentFaceMesh.position.set(0.045, -1, 0);

    currentFacePath = selectedFace;
  }
};
