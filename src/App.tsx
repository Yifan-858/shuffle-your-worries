import { useState, useEffect } from "react";
import * as THREE from "three";
import { useAppStore } from "./stores/useAppStore.js";
import { gltfLoader } from "./utils/gltfLoader.js";
import Canvas from "./components/Canvas";
import InputForm from "./components/UI/InputForm.js";

function App() {
  const { loadAndStoreFaceModels } = useAppStore();
  const [headModel, setHeadModel] = useState<THREE.Object3D>();

  useEffect(() => {
    const preLoadModels = async () => {
      const loadHeadModel = await gltfLoader("/head.glb");
      const headModel = loadHeadModel[0]; //process the gltfLoader return which is an array type

      setHeadModel(headModel);
    };
    preLoadModels();
    loadAndStoreFaceModels();
  }, []);

  return (
    <>
      <div>
        {headModel && <Canvas headModel={headModel} />}
        <InputForm />
      </div>
    </>
  );
}

export default App;
