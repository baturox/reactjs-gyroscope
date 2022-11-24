import React, { useEffect, useState } from 'react';

export default function HomePage() {
  const [permission, setPermission] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    if(permission && isStarting){
      window.addEventListener("deviceorientation", (event) => {
        setX(event.alpha);
        setY(event.beta);
        setZ(event.gamma);
        setEventCount(eventCount => eventCount+1);
      });
    }else{
      window.removeEventListener("deviceorientation", (event) => {
        setX(event.alpha);
        setY(event.beta);
        setZ(event.gamma);
        setEventCount(0);
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

  return (<>
    <button onClick={() => {
      if(isStarting){
        setIsStarting(false);
      }else{
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
