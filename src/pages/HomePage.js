import React, { useEffect, useState } from 'react';

export default function HomePage() {
  const [permission, setPermission] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);

  const handlePermission = () => {
    Promise.all([navigator.permissions.query({ name: "accelerometer" }),
    navigator.permissions.query({ name: "magnetometer" }),
    navigator.permissions.query({ name: "gyroscope" })])
      .then(results => {
        if (results.every(result => result.state === "granted")) {
          setPermission(true);
          window.addEventListener("deviceorientation", (event) => {
            setX(event.alpha);
            setY(event.beta);
            setZ(event.gamma);
          });
        } else {
          console.log("No permissions to use AbsoluteOrientationSensor.");
        }
      });
  }

  useEffect(() => {
    handlePermission();
  }, []);

  return (<>
    {permission && (<ul>
      <li>X: {x}</li>
      <li>Y: {y}</li>
      <li>Z: {z}</li>
    </ul>)}
  </>);
}
