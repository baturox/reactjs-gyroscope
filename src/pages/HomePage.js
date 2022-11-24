import React from 'react';
import useGyroscope from 'react-hook-gyroscope'

  export default function HomePage() {
    const gyroscope = useGyroscope()
    return (!gyroscope.error && gyroscope.x) ? (
        <ul>
          <li>X: {gyroscope.x}</li>
          <li>Y: {gyroscope.y}</li>
          <li>Z: {gyroscope.z}</li>
        </ul>
      ) : (
        <p>No gyroscope, sorry.</p>
      )
  }