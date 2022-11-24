import React, { useEffect, useState } from 'react';

export default function HomePage() {

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);


  useEffect(() => {
    window.addEventListener("deviceorientation", (event) => {
      setX(event.alpha);
      setY(event.beta);
      setZ(event.gamma);
    });
  });

  return (<>
    <ul>
      <li>X: {x}</li>
      <li>Y: {y}</li>
      <li>Z: {z}</li>
    </ul>
  </>);
}
