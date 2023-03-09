# reactjs-gyroscope

This package allows to read gyroscope data [Gyroscope](https://developer.mozilla.org/en-US/docs/Web/API/Gyroscope).

## Installation
```sh
yarn add reactjs-gyroscope
```

## Usage

```jsx
import getGyroscope from 'reactjs-gyroscope';
const frequency = 100;
function App() {
  setInterval(() => {
    const gyroscope = getGyroscope();
    console.log(gyroscope)
  }, frequency);

  return (<></>);
}

export default App;

```

## Notes

Needs permission for deviceorientation event.  (a.k.a. only using HTTPS).

## License

LGPL-3.0