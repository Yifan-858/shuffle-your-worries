import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
// import type { Thought } from "../components/Thought";
import * as THREE from "three";

export const gltfLoader = async (
  //take modelUrl array, resuable for both Thoughts and Face
  modelsUrls: string[]
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

  const models = await Promise.all(modelsUrls.map((url) => loadModel(url)));

  return models;
};
