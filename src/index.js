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

const sendPermission = () => {
    if (DeviceMotionEvent &&
        typeof DeviceMotionEvent.requestPermission === "function") {
        DeviceMotionEvent.requestPermission();
    } else {
        navigator.permissions.query({
            name: "gyroscope"
        });
    }
}

const getGyroscope = () => {
    window.addEventListener("deviceorientation", getGyroscopeDataFromEvent);
    return gyroscopeData;
};


export default getGyroscope;    