import { useState, useEffect } from "react";
import Canvas from "./components/Canvas";
import { gltfLoader } from "./utils/gltfLoader.js";
import { thoughtList } from "./components/Thought";
import * as THREE from "three";

function App() {
  const [models, setModels] = useState<THREE.Object3D[]>([]);

  useEffect(() => {
    gltfLoader(thoughtList).then(setModels);
  }, []);

  return (
    <>
      <div>
        <Canvas models={models} />
      </div>
    </>
  );
}

export default App;
