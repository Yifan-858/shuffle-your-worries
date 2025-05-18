export type Thought = {
  id: string;
  description: string;
  modelUrl: string;
  orbitIndex: number;
  createdAt: string;
};

export const thoughtList: Thought[] = [
  {
    id: "1",
    description: "hi",
    modelUrl: "/thought1.glb",
    orbitIndex: 0,
    createdAt: "001",
  },
  {
    id: "2",
    description: "hi",
    modelUrl: "/thought2.glb",
    orbitIndex: 2,
    createdAt: "002",
  },
  {
    id: "3",
    description: "hi",
    modelUrl: "/thought3.glb",
    orbitIndex: 3,
    createdAt: "003",
  },
  {
    id: "4",
    description: "hi",
    modelUrl: "/thought4.glb",
    orbitIndex: 4,
    createdAt: "004",
  },
  {
    id: "5",
    description: "hi",
    modelUrl: "/thought5.glb",
    orbitIndex: 5,
    createdAt: "005",
  },
];
