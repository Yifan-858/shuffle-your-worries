import { create } from "zustand";
import * as THREE from "three";
import { gltfLoader } from "../utils/gltfLoader";
import { createOrbitLines } from "../components/OrbitRings";

type Thought = {
  id: string;
  description: string;
  modelUrl: string;
  orbitIndex: number;
  createdAt: string;
};

type AppState = {
  thoughts: Thought[];
  thoughtModels: THREE.Object3D[];
  addThoughtFromInput: (description: string) => void;

  orbitLines: THREE.Mesh[];
  attachOrbit: (orbitRadius: number) => void;

  faceModels: THREE.Object3D[];
  setFaceModels: (models: THREE.Object3D[]) => void;
  loadAndStoreFaceModels: () => Promise<void>;
  selectedFace?: THREE.Object3D;
  currentFace?: THREE.Object3D;
  setCurrentFace: (face: THREE.Object3D | undefined) => void;
  updateFaceByThoughts: (thoughtCount: number) => void;
};

const thoughtModelPool = [
  "/thought1.glb",
  "/thought2.glb",
  "/thought3.glb",
  "/thought4.glb",
  "/thought5.glb",
];

const faceModelPool = ["/face1.glb", "/face2.glb", "/face3.glb"];

export const useAppStore = create<AppState>((set, get) => ({
  thoughts: [],
  thoughtModels: [],
  addThoughtFromInput: async (description: string) => {
    const modelUrl =
      thoughtModelPool[Math.floor(Math.random() * thoughtModelPool.length)];

    const newThought: Thought = {
      id: crypto.randomUUID(),
      description,
      modelUrl,
      orbitIndex: get().thoughts.length,
      createdAt: new Date().toISOString(),
    };

    const [model] = await gltfLoader(modelUrl);

    set({
      thoughts: [...get().thoughts, newThought],
      thoughtModels: [...get().thoughtModels, model],
    });

    const orbitRadius = get().thoughts.length / 2 + 1.5;
    get().attachOrbit(orbitRadius);

    get().updateFaceByThoughts(get().thoughts.length);
  },

  orbitLines: [],
  attachOrbit: (orbitRadius) => {
    const neworbitLines = createOrbitLines(orbitRadius);
    set((state) => ({
      orbitLines: [...state.orbitLines, neworbitLines],
    }));
  },

  faceModels: [],
  setFaceModels: (models) => set({ faceModels: models }),

  loadAndStoreFaceModels: async () => {
    const loadedFaceModels: THREE.Object3D[] = [];

    for (const url of faceModelPool) {
      const [scene] = await gltfLoader(url);
      loadedFaceModels.push(scene);
    }

    set({ faceModels: loadedFaceModels });

    //set inital face experssion
    if (loadedFaceModels[0]) {
      set({ selectedFace: loadedFaceModels[0].clone() });
    }
  },

  selectedFace: undefined,
  updateFaceByThoughts: (count) => {
    const faceModels = get().faceModels;

    let faceIndex = 0;
    if (count > 2 && count <= 5) faceIndex = 1;
    else if (count > 5) faceIndex = 2;

    const targetModel = faceModels[faceIndex];

    if (!targetModel) return;

    set({ selectedFace: targetModel.clone() }); // Clone to prevent shared mutation
  },

  currentFace: undefined,
  setCurrentFace: (face) => set({ currentFace: face }),
}));
