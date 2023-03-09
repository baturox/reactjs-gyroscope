let gyroscopeData = {
  x: null,
  y: null,
  z: null
};

const getGyroscopeDataFromEvent = event => {
  gyroscopeData = {
    x: event.alpha,
    y: event.beta,
    z: event.gamma
  };
};
const getGyroscope = () => {
  if (typeof DeviceMotionEvent !== 'undefined' && DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === "function") {
    DeviceMotionEvent.requestPermission().then(response => {
      if (response == "granted") {
        window.addEventListener("deviceorientation", getGyroscopeDataFromEvent);
      }
    });
  } else {
    navigator.permissions.query({
      name: "gyroscope"
    }).then(result => {
      if (result.state === "granted") {
        window.addEventListener("deviceorientation", getGyroscopeDataFromEvent);
      }
    });
  }
  return gyroscopeData;
};
export default getGyroscope;