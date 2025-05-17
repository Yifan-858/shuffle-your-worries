import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import type { Thought } from "../components/Thought";
import * as THREE from "three";

export const gltfLoader = async (
  thoughts: Thought[]
): Promise<THREE.Object3D[]> => {
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

  const models = await Promise.all(thoughts.map((t) => loadModel(t.modelUrl)));
  return models;
};
