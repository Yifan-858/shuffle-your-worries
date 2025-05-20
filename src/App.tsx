import { useState, useEffect } from "react";
import * as THREE from "three";
import { useAppStore } from "./stores/useAppStore.js";
import { gltfLoader } from "./utils/gltfLoader.js";
import Canvas from "./components/Canvas";
import InputForm from "./components/UI/InputForm.js";
import LoadingScreen from "./components/UI/LoadingScreen.js";

function App() {
  const { loadAndStoreFaceModels } = useAppStore();
  const [headModel, setHeadModel] = useState<THREE.Object3D>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const preLoadModels = async () => {
      try {
        const loadHeadModel = await gltfLoader("/head.glb");
        const headModel = loadHeadModel[0]; //process the gltfLoader return which is an array type

        setHeadModel(headModel);
        await loadAndStoreFaceModels();
      } finally {
        setLoading(false);
      }
    };

    preLoadModels();
  }, []);

  return (
    <>
      {loading && <LoadingScreen />}
      {!loading && (
        <div>
          {headModel && <Canvas headModel={headModel} />}
          <InputForm />
        </div>
      )}
    </>
  );
}

export default App;
