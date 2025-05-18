import { useState, useEffect } from "react";
import Canvas from "./components/Canvas";
import { gltfLoader } from "./utils/gltfLoader.js";
import { thoughtList } from "./components/Thought";
import * as THREE from "three";

function App() {
  const [thoughtModels, setThoughtModels] = useState<THREE.Object3D[]>([]);
  // const [faceModels, setFaceModels] = useState<THREE.Object3D[]>([]);

  useEffect(() => {
    const loadAllModels = async () => {
      const thoughtUrls = thoughtList.map((thought) => thought.modelUrl);

      const thoughts = await gltfLoader(thoughtUrls);

      // const faces = await gltfLoader(faceUrls);
      setThoughtModels(thoughts);
    };
    loadAllModels();
  }, []);

  return (
    <>
      <div>
        <Canvas thoughtModels={thoughtModels} />
      </div>
    </>
  );
}

export default App;
