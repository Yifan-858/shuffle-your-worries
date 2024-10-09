import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";
import { Pane } from "tweakpane";
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass.js";

//initialize the scene
const scene = new THREE.Scene();

const cubeMaterial = new THREE.MeshPhysicalMaterial();
cubeMaterial.color = new THREE.Color("green");
cubeMaterial.clearcoat = 1;

const sphereGeometry = new THREE.SphereGeometry(0.6, 40, 40);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.4, 0.15, 100, 16);
const coneGeometry = new THREE.ConeGeometry(0.6, 1.2, 25);

const sphereMesh = new THREE.Mesh(sphereGeometry, cubeMaterial);
const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, cubeMaterial);
const coneMesh = new THREE.Mesh(coneGeometry, cubeMaterial);

torusKnotMesh.position.x = 2;
coneMesh.position.x = -4;

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
// loader.load(
//   "pillow.gltf",
//   function (gltf) {

//     const model = gltf.scene;
//     scene.add(model);
//     model.position.set(0, -1, 0);
//   }
// );

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
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.z = 5;

const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });

const maxPixelRatico = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(maxPixelRatico);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper);

renderer.setSize(window.innerWidth, window.innerHeight);

//window event, spare the resizing being called every frame
window.addEventListener("resize", () => {
  console.log(window.innerWidth / window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); //needed for the para update for camera
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
