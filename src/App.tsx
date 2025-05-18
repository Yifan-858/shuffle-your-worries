import { useState, useEffect } from "react";
import Canvas from "./components/Canvas";
import { gltfLoader } from "./utils/gltfLoader.js";
import { thoughtList } from "./components/Thought";
import { faceUrls } from "./components/Face";
import * as THREE from "three";

function App() {
  const [headModel, setHeadModel] = useState<THREE.Object3D>();
  const [faceArray, setFacrArray] = useState<THREE.Object3D[]>([]);
  const [faceModel, setFaceModel] = useState<THREE.Object3D>();
  const [thoughtModels, setThoughtModels] = useState<THREE.Object3D[]>([]);

  useEffect(() => {
    const loadModels = async () => {
      const loadHeadModel = await gltfLoader("/head.glb");
      const headModel = loadHeadModel[0]; //process the gltfLoader return which is an array type
      const faces = await gltfLoader(faceUrls);
      const thoughtUrls = thoughtList.map((thought) => thought.modelUrl);
      const thoughts = await gltfLoader(thoughtUrls);

      setHeadModel(headModel);
      setThoughtModels(thoughts);
      setFacrArray(faces);
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (!faceArray.length) return;

    let selectedFace: THREE.Object3D;
    console.log("thoughtlength:", thoughtModels.length);
    if (thoughtModels.length >= 0 && thoughtModels.length <= 1) {
      selectedFace = faceArray[0]; // default calm face
    } else if (thoughtModels.length > 1 && thoughtModels.length <= 5) {
      selectedFace = faceArray[1]; // surprised face
    } else {
      selectedFace = faceArray[2]; // shocked face
    }

    setFaceModel(selectedFace);
  }, [thoughtModels, faceArray]);

  return (
    <>
      <div>
        {faceModel && headModel && (
          <Canvas
            thoughtModels={thoughtModels}
            faceModel={faceModel}
            headModel={headModel}
          />
        )}
      </div>
    </>
  );
}

export default App;
