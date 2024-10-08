import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";
import { Pane } from "tweakpane";

const scene = new THREE.Scene();
const pane = new Pane();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshPhysicalMaterial();
cubeMaterial.color = new THREE.Color("green");
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

const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);

// const fog = new THREE.Fog(0xffffff, 1, 20);
// scene.fog = fog;
// scene.background = new THREE.Color(0xffffff);

//cubeMaterial.fog = false; set mesh to be affected by fog

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
const cubeMesh1 = new THREE.Mesh(torusKnotGeometry, cubeMaterial);
const cubeMesh2 = new THREE.Mesh(cubeGeometry, cubeMaterial);

cubeMesh1.position.x = 2;
cubeMesh2.position.x = -2;

scene.add(cubeMesh, cubeMesh1, cubeMesh2);

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
