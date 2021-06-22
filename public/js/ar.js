const sceneEl = document.getElementById('scene');
const camera = document.getElementById('camera');
const el = document.getElementById('a-entity')
var rotationFactor = 5;

let isMarkerVisible;

// listener for marker event
sceneEl.addEventListener("markerFound", (e) => {
    isMarkerVisible = true;
    //get marker id
    let markerName = e.target.attributes.id.nodeValue;
    // marker-id and simulated camera coordinates
    console.log(markerName, camera.getAttribute("gps-projected-camera"));
    if(markerName == 'ifgi-marker' & camera.getAttribute("gps-projected-camera").simulateLatitude != 51.96921096587609 & camera.getAttribute("gps-projected-camera").simulateLongitude != 7.595987023161684) {
        //go to page with the right simulated location
        window.location.replace("https://10.67.72.153:3000/location1");
    }
    else {
        //otherwise stay here
        console.log("still the same");
    }
});

//listener for marker event
sceneEl.addEventListener("markerLost", (e) => {
    isMarkerVisible = false;
});

//rotate object when touched with one finger
sceneEl.addEventListener('onefingermove', (e) => {
    // control if marker is in fov
    if (isMarkerVisible) {
        el.object3D.rotation.y +=
            e.detail.positionChange.x * rotationFactor;

        el.object3D.rotation.x +=
            e.detail.positionChange.y * rotationFactor;
    }
})
//zoom in/out when touched with two fingers
sceneEl.addEventListener('twofingermove', (e) => {
    if (isMarkerVisible) {
        this.scaleFactor *=
            1 + e.detail.spreadChange / e.detail.startSpread;
    }
})