import React, { useEffect, useState } from 'react';

export default function HomePage() {
  const [permission, setPermission] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);

  useEffect(() => {
    window.addEventListener("deviceorientation", (event) => {
      setX(event.alpha);
      setY(event.beta);
      setZ(event.gamma);
    });
  }, []);

  return (<>
    <button onClick={() => {
      setIsStarting(true);
      if (
        DeviceMotionEvent &&
        typeof DeviceMotionEvent.requestPermission === "function"
      ) {
        DeviceMotionEvent.requestPermission().then(response => {
          if (response == "granted") {
            setPermission(true);
          }
        })
      }
    }}>{'Start'}</button>

    {(isStarting) && (<ul>
      <li>X: {x}</li>
      <li>Y: {y}</li>
      <li>Z: {z}</li>
    </ul>)}
  </>);
}
