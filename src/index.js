import { useEffect, useState } from 'react';

const GetGyroscope = () => {
    const [gyroscopeData, setGyroscopeData] = useState({
        x: null,
        y: null,
        z: null
    });

    const getGyroscopeDataFromEvent = (event) => {
        const data = {
            x: event.alpha,
            y: event.beta,
            z: event.gamma,
        }

        setGyroscopeData({ ...data });
    }

    useEffect(() => {
        getPermission();
    }, []);

    const getPermission = () => {
        if (
            typeof DeviceMotionEvent !== 'undefined' &&
            DeviceMotionEvent &&
            typeof DeviceMotionEvent.requestPermission === "function"
        ) {
            DeviceMotionEvent.requestPermission().then(response => {
                if (response == "granted") {
                    window.addEventListener("deviceorientation", getGyroscopeDataFromEvent);
                }
            })
        } else {
            navigator.permissions.query({ name: "gyroscope" })
                .then(result => {
                    if (result.state === "granted") {
                        window.addEventListener("deviceorientation", getGyroscopeDataFromEvent);
                    }
                });
        }
    }

    return gyroscopeData;
}

export default GetGyroscope;