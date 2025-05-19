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

  selectedFace?: THREE.Object3D;
  updateFaceByThoughts: (thoughtCount: number) => void;
};

const thoughtModelPool = [
  "/thought1.glb",
  "/thought2.glb",
  "/thought3.glb",
  "/thought4.glb",
  "/thought5.glb",
];

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

  selectedFace: undefined,
  updateFaceByThoughts: (count) => {
    const faceModels = get().faceModels;
    let face: THREE.Object3D;
    if (count <= 1) face = faceModels[0];
    else if (count <= 5) face = faceModels[1];
    else face = faceModels[2];
    set({ selectedFace: face });
  },
}));
