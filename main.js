import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";
import { Pane } from "tweakpane";
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass.js";

//initialize the scene
const scene = new THREE.Scene();

//add material
const cubeMaterial = new THREE.MeshPhysicalMaterial();
cubeMaterial.color = new THREE.Color(0xef5930);
cubeMaterial.clearcoat = 1;
const faceMaterial = new THREE.MeshPhysicalMaterial();
faceMaterial.color = new THREE.Color(0x456456);
faceMaterial.clearcoat = 1;

//add geometry
const sphereGeometry = new THREE.SphereGeometry(0.6, 40, 40);
const sphereGeometry2 = new THREE.SphereGeometry(0.3, 40, 40);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.4, 0.15, 100, 16);
const coneGeometry = new THREE.ConeGeometry(0.6, 1.2, 25);

const sphereMesh = new THREE.Mesh(sphereGeometry, cubeMaterial);
let sphereMesh2 = new THREE.Mesh(sphereGeometry2, faceMaterial);
const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, cubeMaterial);
const coneMesh = new THREE.Mesh(coneGeometry, cubeMaterial);
sphereMesh2 = new THREE.Mesh(sphereGeometry2, cubeMaterial);
sphereMesh2.position.z = 0.8;
sphereMesh.add(sphereMesh2);
scene.add(sphereMesh, torusKnotMesh, coneMesh);

//initialize the pane
const pane = new Pane();

pane.addInput(cubeMaterial, "metalness", {
  min: 0,
  max: 1,
  step: 0.01,
});
pane.addInput(cubeMaterial, "roughness", {
  min: 0,
  max: 1,
  step: 0.01,
});
pane.addInput(cubeMaterial, "opacity", {
  min: 0,
  max: 1,
  step: 0.01,
});
pane.addInput(cubeMaterial, "clearcoat", {
  min: 0,
  max: 1,
  step: 0.01,
});
pane.addInput(cubeMaterial, "transparent", {
  options: { on: "true", off: "false" },
});

// const loader = new GLTFLoader();
// loader.load("pillow.gltf", function (gltf) {
//   const model = gltf.scene;
//   scene.add(model);
//   model.position.set(0, 0, 0);
// });

// const fog = new THREE.Fog(0xffffff, 1, 20);
// scene.fog = fog;

scene.background = new THREE.Color(0xeee1d4);

//cubeMaterial.fog = false; set mesh to be affected by fog

const light = new THREE.AmbientLight(0xffffff, 2);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 100);
pointLight.position.set(5, 5, 1);
scene.add(pointLight);

const camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.z = 20;

//get html element
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });

//make the image smooth
const maxPixelRatico = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(maxPixelRatico);

//add control
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; //call .update () in render loop

//add helper
const axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper);

//initiate render size
renderer.setSize(window.innerWidth, window.innerHeight);

//window event, spare the resizing being called every frame
window.addEventListener("resize", () => {
  console.log(window.innerWidth / window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); //needed for the para update for camera
  renderer.setSize(window.innerWidth, window.innerHeight); //update
});

const clock = new THREE.Clock();

const renderloop = () => {
  const elapsedTime = clock.getElapsedTime();

  coneMesh.position.x = Math.sin(elapsedTime) * 4;
  coneMesh.position.z = Math.cos(elapsedTime) * 4;
  torusKnotMesh.rotation.y += 0.05;
  torusKnotMesh.position.x = Math.sin(torusKnotMesh.rotation.y) * 2;
  torusKnotMesh.position.z = Math.cos(torusKnotMesh.rotation.y) * 2;

  controls.update(); // for controls.enableDamping
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
