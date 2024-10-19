import {
  GLTFLoader,
  OrbitControls,
  DRACOLoader,
} from "three/examples/jsm/Addons.js";

import "./style.css";
import * as THREE from "three";

//initialize the scene
const scene = new THREE.Scene();

//add background color
scene.background = new THREE.Color(0xeee1d4);

//add lights
const light = new THREE.AmbientLight(0xffffff, 2);
scene.add(light);

const pointLight = new THREE.PointLight(0xf7bc97, 100);
pointLight.position.set(4, 2, 2);
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0x97dff7, 80);
pointLight2.position.set(-4, 2, 2);
scene.add(pointLight2);

//add camera
const camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  4000
);

camera.position.z = 10;
camera.position.y = 3;

//add axeshelper
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

//add loaders
const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();

dracoLoader.setDecoderPath("/draco/");
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load("head.glb", function (glb) {
  const model = glb.scene;
  scene.add(model);
  model.position.set(0, 0, 0);
});

//add random geo to scene
let thoughtMesh;
let rotatingMeshes = [];

const addRandomMesh = () => {
  const gltfPaths = [
    "though1.glb",
    "though2.glb",
    "though3.glb",
    "though4.glb",
    "though5.glb",
  ];

  const i = Math.floor(Math.random() * gltfPaths.length);
  const selectedGltf = gltfPaths[i];

  gltfLoader.load(selectedGltf, function (glb) {
    thoughtMesh = glb.scene;
    scene.add(thoughtMesh);
    rotatingMeshes.push(thoughtMesh);
  });
};

//add face expression
let selectedFace;
const facePath = ["face1.glb", "face2.glb", "face3.glb"];
let currentFacePath = facePath[0];
let currentFaceMesh = null;
let preloadedFaces = {};

gltfLoader.load(currentFacePath, function (glb) {
  currentFaceMesh = glb.scene;
  scene.add(currentFaceMesh);
  currentFaceMesh.position.set(0.045, 0, 0);
});

const preloadFaces = () => {
  facePath.forEach((path) => {
    gltfLoader.load(path, function (glb) {
      preloadedFaces[path] = glb.scene; // Save the loaded scene
    });
  });
};

preloadFaces();
const updateFace = () => {
  if (rotatingMeshes.length >= 0 && rotatingMeshes.length <= 1) {
    selectedFace = facePath[0];
  } else if (rotatingMeshes.length > 1 && rotatingMeshes.length <= 5) {
    selectedFace = facePath[1];
  } else {
    selectedFace = facePath[2];
  }

  if (currentFacePath !== selectedFace) {
    scene.remove(currentFaceMesh);
    currentFaceMesh = null;

    currentFaceMesh = preloadedFaces[selectedFace].clone(); // Clone to avoid sharing
    scene.add(currentFaceMesh);
    currentFaceMesh.position.set(0.045, 0, 0);

    currentFacePath = selectedFace;
    console.log("reload");
  }
};

//get html element
const canvas = document.querySelector("canvas.threejs");
const plusButton = document.querySelector("#plus-button");
const inputText = document.querySelector("#input-text");

//add control
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; //call .update () in render loop

//add functions and UI
const handleClick = () => {
  if (inputText.value.trim() === "") {
    inputText.classList.add("error");
    setTimeout(() => {
      inputText.classList.remove("error");
    }, 1000);
    return;
  }

  inputText.value = "";
  addRandomMesh();
  updateFace();
};

plusButton.addEventListener("click", handleClick);

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });

//make the image smooth
const maxPixelRatico = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(maxPixelRatico);

//initiate render size
renderer.setSize(window.innerWidth, window.innerHeight);

//window event, spare the resizing being called every frame
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); //needed for the para update for camera
  renderer.setSize(window.innerWidth, window.innerHeight); //update
});

const renderloop = () => {
  rotatingMeshes.forEach((mesh) => {
    mesh.position.y = 1;
    mesh.rotation.y += 0.01;
    mesh.position.x = Math.sin(mesh.rotation.y) * 2;
    mesh.position.z = Math.cos(mesh.rotation.y) * 2;
  });

  controls.update(); // for controls.enableDamping
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
