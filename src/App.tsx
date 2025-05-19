import { useState, useEffect } from "react";
import Canvas from "./components/Canvas";
import { gltfLoader } from "./utils/gltfLoader.js";
import * as THREE from "three";
import { useAppStore } from "./stores/useAppStore.js";

function App() {
  const { loadAndStoreFaceModels, addThoughtFromInput } = useAppStore();
  const [headModel, setHeadModel] = useState<THREE.Object3D>();
  const [input, setInput] = useState("");
  // const [faceArray, setFacrArray] = useState<THREE.Object3D[]>([]);
  // const [faceModel, setFaceModel] = useState<THREE.Object3D>();
  // const [thoughtModels, setThoughtModels] = useState<THREE.Object3D[]>([]);

  useEffect(() => {
    const preLoadModels = async () => {
      const loadHeadModel = await gltfLoader("/head.glb");
      const headModel = loadHeadModel[0]; //process the gltfLoader return which is an array type
      // const faces = await gltfLoader(faceUrls);

      setHeadModel(headModel);
      // setFacrArray(faces);
    };
    preLoadModels();
    loadAndStoreFaceModels();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    addThoughtFromInput(input.trim());
    setInput("");
  };

  return (
    <>
      <div>
        {headModel && <Canvas headModel={headModel} />}
        <form className="inputContainer" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="thought-input"
            id="thought-input"
          />
          <button
            type="submit"
            className="thought-input-button"
            id="thought-inputs-button"
          >
            +
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
