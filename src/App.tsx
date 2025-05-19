import { useState, useEffect } from "react";
import Canvas from "./components/Canvas";
import { gltfLoader } from "./utils/gltfLoader.js";
import * as THREE from "three";
import { useAppStore } from "./stores/useAppStore.js";

// const faceUrls: string[] = ["/face1.glb", "/face2.glb", "/face3.glb"];

function App() {
  const { addThoughtFromInput, thoughtModels } = useAppStore();
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
      // const thoughtUrls = thoughtList.map((thought) => thought.modelUrl);
      // const thoughts = await gltfLoader(thoughtUrls);

      setHeadModel(headModel);
      // setThoughtModels(thoughts);
      // setFacrArray(faces);
    };
    preLoadModels();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    addThoughtFromInput(input.trim());
    setInput("");
    console.log(thoughtModels.length);
  };
  console.log(thoughtModels.length);

  return (
    <>
      <div>
        {headModel && (
          <Canvas
            thoughtModels={thoughtModels}
            // faceModel={faceModel}
            headModel={headModel}
          />
        )}
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
