import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type CanvasProps = {
  thoughtModels: THREE.Object3D[];
};

const Canvas = ({ thoughtModels }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    console.log("in canvas, thoughtModels before foreach:", thoughtModels);

    // add scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeee1d4);

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

    //add (mouse) control
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = true; //call .update () in render loop
    controls.dampingFactor = 0.1; // control mouse movement lower = smoother/slower movement
    controls.rotateSpeed = 0.5; // control mouse movement lower = drag rotation
    //controls.target.set(0, 0, 0); // Adjust this based on models' center

    const rotatingThoughts: THREE.Object3D[] = [];
    //pass thoughtList to modified gltfLoader and extract the 3D model object

    thoughtModels.forEach((model, i) => {
      model.position.x = Math.sin(i) * 3;
      model.position.z = Math.cos(i) * 3;
      scene.add(model);
      rotatingThoughts.push(model);
    });
    console.log("in canvas, thoughtModels after foreach:", thoughtModels);
    //window event, spare the resizing being called every frame
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    const animate = () => {
      requestAnimationFrame(animate);
      //add self rotation to the Thoughts
      rotatingThoughts.forEach((model) => {
        model.rotation.y += 0.01;
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
  }, [thoughtModels]);

  return <canvas ref={canvasRef} className="threejs" />;
};

export default Canvas;
