import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { useAppStore } from "../stores/useAppStore";
import { backgroundColor } from "../theme";
import { zoomInToModel, zoomOutToDefault } from "../utils/zoomHandler";
import { thoughtClickHandler } from "../utils/thoughtClickHandler";

type CanvasProps = {
  headModel?: THREE.Object3D;
};

const Canvas = ({ headModel }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const controlsRef = useRef<OrbitControls>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>(null);
  const rotatingThoughts = useRef<THREE.Object3D[]>([]);

  const initialCameraPosition = useRef<THREE.Vector3>(null);
  const initialTarget = useRef<THREE.Vector3>(null);

  const thoughtModels = useAppStore((state) => state.thoughtModels);
  const orbitLines = useAppStore((state) => state.orbitLines);
  const selectedFace = useAppStore((state) => state.selectedFace);
  const currentFace = useAppStore((state) => state.currentFace);
  const setCurrentFace = useAppStore((state) => state.setCurrentFace);
  const selectedThoughtModel = useAppStore(
    (state) => state.selectedThoughtModel
  );
  const clearSelectedThought = useAppStore(
    (state) => state.clearSelectedThought
  );
  const shouldRotate = useAppStore((state) => state.shouldRotate);
  const setShouldRotate = useAppStore((state) => state.setShouldRotate);
  const shouldRotateRef = useRef(true);

  const handleZoomOut = useCallback(() => {
    if (
      cameraRef.current &&
      controlsRef.current &&
      initialCameraPosition.current &&
      initialTarget.current
    ) {
      zoomOutToDefault(
        cameraRef.current,
        controlsRef.current,
        initialCameraPosition.current,
        initialTarget.current
      );
      clearSelectedThought();
    }
  }, [clearSelectedThought]);

  useEffect(() => {
    shouldRotateRef.current = shouldRotate;
  }, [shouldRotate]);

  useEffect(() => {
    if (!canvasRef.current) return;

    // add scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);
    sceneRef.current = scene;

    // add lights
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    const pointLight = new THREE.PointLight(0xf7bc97, 100);
    pointLight.position.set(4, 2, 2);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x97dff7, 80);
    pointLight2.position.set(-4, 2, 2);
    scene.add(pointLight2);

    // create camera
    const camera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      0.1,
      4000
    );
    camera.position.z = 15;
    camera.position.y = -3;
    cameraRef.current = camera;
    //store the camera initial position
    initialCameraPosition.current = camera.position.clone();

    //add (mouse) control
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = true; //call .update () in render loop
    controls.dampingFactor = 0.1; // control mouse movement lower = smoother/slower movement
    controls.rotateSpeed = 0.5; // control mouse movement lower = drag rotation
    controlsRef.current = controls;
    //store the camera initial target
    initialTarget.current = controls.target.clone();

    // create renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    //make the image smooth
    const maxPixelRatico = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(maxPixelRatico);
    //initiate render size
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    //window event, spare the resizing being called every frame
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    const animate = () => {
      requestAnimationFrame(animate);

      rotatingThoughts.current.forEach((model, index) => {
        //radius (position)
        model.position.x = Math.sin(model.rotation.y) * (2 + index / 2);
        model.position.z = Math.cos(model.rotation.y) * (2 + index / 2);
        //rotating around the head
        const radius = 2 + index / 2;
        const angularSpeed = 0.0045 / radius;

        if (shouldRotateRef.current) {
          model.rotation.y -= angularSpeed;
        }
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // clean up
    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    const canvas = canvasRef.current;
    const camera = cameraRef.current;

    if (!scene || !canvas || !camera) return;

    // Clean thoughts
    rotatingThoughts.current.forEach((model) => scene.remove(model));
    rotatingThoughts.current = [];

    //add head
    if (headModel) {
      scene.add(headModel);
      headModel.position.set(0, -1, 0);
    }

    orbitLines.forEach((line) => {
      scene.add(line);
    });

    //add selected face
    if (selectedFace) {
      if (!currentFace || currentFace.uuid !== selectedFace.uuid) {
        // remove old face if it exists
        if (currentFace) scene.remove(currentFace);

        // clone and add new face
        const newFace = selectedFace.clone();
        newFace.position.set(0.045, -1, 0);
        scene.add(newFace);

        setCurrentFace(newFace);
      }
    }

    //pass thoughtList to modified gltfLoader and extract the 3D model object
    if (thoughtModels) {
      thoughtModels.forEach((model) => {
        scene.add(model);
        rotatingThoughts.current.push(model);
      });
    }

    const handleClick = thoughtClickHandler(
      camera,
      canvas,
      rotatingThoughts.current
    );
    canvas.addEventListener("click", handleClick);

    return () => {
      canvas.removeEventListener("click", handleClick);
    };
  }, [thoughtModels, selectedFace, headModel, orbitLines]);

  //track the selected thought
  useEffect(() => {
    if (selectedThoughtModel && cameraRef.current && controlsRef.current) {
      zoomInToModel(
        cameraRef.current,
        controlsRef.current,
        selectedThoughtModel
      );
      //stop rotating when zoomed in
      setShouldRotate(false);
    }
  }, [selectedThoughtModel, setShouldRotate]);

  //test with escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleZoomOut();
        setShouldRotate(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleZoomOut, setShouldRotate]);

  return <canvas ref={canvasRef} className="threejs-canvas" />;
};

export default Canvas;
