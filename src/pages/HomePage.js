import React, { useEffect, useState } from 'react';
import THREE from 'three.js';


let scene;
let renderer;
let cube;
let camera;
export default function HomePage() {
  const [permission, setPermission] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    if (permission && isStarting) {
      box();
      window.addEventListener("deviceorientation", (event) => {
        setX(event.alpha);
        setY(event.beta);
        setZ(event.gamma);
        setEventCount(eventCount => eventCount + 1);
      });
    } else {
      window.removeEventListener("deviceorientation", (event) => {
        setX(event.alpha);
        setY(event.beta);
        setZ(event.gamma);
      });
    }
  }, [permission, isStarting]);

  const getPermission = () => {
    if (
      typeof DeviceMotionEvent !== 'undefined' &&
      DeviceMotionEvent &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      DeviceMotionEvent.requestPermission().then(response => {
        if (response == "granted") {
          setPermission(true);
        }
      })
    } else {
      navigator.permissions.query({ name: "gyroscope" })
        .then(result => {
          if (result.state === "granted") {
            setPermission(true);
          }
        });
    }
  }

  const box = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    cube = (new THREE.Mesh(geometry, material));
    scene.add(cube);
    camera.position.z = 5;
  }

  useEffect(() => {
    if (cube) {
      cube.rotation.x = x * 0.1;
      cube.rotation.y = y * 0.1;
      cube.rotation.z = z * 0.1;

      renderer.render(scene, camera);
    }
  }, [x, y, z]);


  return (<>
    <button onClick={() => {
      if (isStarting) {
        setIsStarting(false);
        setEventCount(0);
      } else {
        setIsStarting(true);
        getPermission();
      }

    }}>{!isStarting ? 'Start' : 'Stop'}</button>

    {(isStarting && permission) && (<ul>
      <li>Event Count: {eventCount}</li>
      <li>X: {Number(x).toFixed(2)}</li>
      <li>Y: {Number(y).toFixed(2)}</li>
      <li>Z: {Number(z).toFixed(2)}</li>
    </ul>)}
  </>);
}
