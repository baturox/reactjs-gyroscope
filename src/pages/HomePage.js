import React, { useEffect, useState } from 'react';
import useNavigatorPermissions from 'react-use-navigator-permissions'

export default function HomePage() {
  const [permission, setPermission] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const { status, error } = useNavigatorPermissions('gyroscope')

  useEffect(() => {
    console.log(status);
    if (status && status == 'granted') {
      window.addEventListener("deviceorientation", (event) => {
        setX(event.alpha);
        setY(event.beta);
        setZ(event.gamma);
      });
    }
  }, [status]);

  return (<>
    {permission}
    {(<ul>
      <li>X: {x}</li>
      <li>Y: {y}</li>
      <li>Z: {z}</li>
    </ul>)}
  </>);
}
