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
    modelUrl: "/thought3.glb",
    orbitIndex: 0,
    createdAt: "001",
  },
];
