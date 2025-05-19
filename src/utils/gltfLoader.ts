import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import * as THREE from "three";

export const gltfLoader = async (
  //take modelUrl string/array, resuable for both Thoughts, FaceExperssions and Head
  modelUrls: string | string[]
): Promise<THREE.Object3D[]> => {
  //add Three GLTFLoader
  const loader = new GLTFLoader();

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadModel = (url: string): Promise<THREE.Object3D> => {
    return new Promise((resolve, reject) => {
      loader.load(
        url,
        (gltf) => resolve(gltf.scene),
        undefined,
        (error) => reject(error)
      );
    });
  };

  if (Array.isArray(modelUrls)) {
    const models = await Promise.all(modelUrls.map((url) => loadModel(url)));
    return models;
  } else {
    const model = await loadModel(modelUrls);
    return [model]; // keep the return type as array
  }
};
