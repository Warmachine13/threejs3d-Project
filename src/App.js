import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { } from "react-three-fiber";
// import { OrbitControls } from "./OrbitControls";

class App extends Component {
  componentDidMount() {


    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 2);

    let cubeCamera = new THREE.CubeCamera(1, 1000, 256, { format: THREE.RGBAFormat, magFilter: THREE.LinearFilter, minFilter: THREE.LinearFilter });

    //Since gamma is applied during rendering, the cubeCamera renderTarget texture encoding must be sRGBEncoding
    cubeCamera.renderTarget.texture.encoding = THREE.sRGBEncoding;

    // controls
    // var controls = new OrbitControls(camera, renderer.domElement);
    // // controls.addEventListener('change', render);
    // controls.minDistance = 10;
    // controls.maxDistance = 50;
    // controls.enablePan = false;


    var renderer = new THREE.WebGLRenderer({ antialias: true });

    //timeout para ativar os controles após 1 segundo para não bugar
    this.timeout = setTimeout(_ => {
      var controls = new OrbitControls(camera, renderer.domElement);
      controls.addEventListener('change', this.render);
      controls.minDistance = 0;
      controls.maxDistance = 10000;
      controls.enablePan = true;
    }, 1000);

    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    this.mount.appendChild(renderer.domElement);
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    var cube = new THREE.Mesh(geometry, material);


    scene.add(cube);
    //camera.position.z = 5;





    var animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();


  }
  render() {
    return (
      <div ref={ref => (this.mount = ref)} />
    )
  }
}

export default App;