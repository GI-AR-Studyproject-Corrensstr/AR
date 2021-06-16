const sceneEl = document.getElementById('scene');
const camera = document.getElementById('camera');
const el = document.getElementById('a-entity')
var rotationFactor = 5;

let isMarkerVisible;

sceneEl.addEventListener("markerFound", (e) => {
    isMarkerVisible = true;
    let markerName = e.target.attributes.id.nodeValue;
    console.log(markerName);
    console.log(camera);
    console.log(camera.getAttribute("gps-camera").simulateLatitude);
    camera.setAttribute("gps-camera", "51.99");
    console.log(camera.getAttribute("gps-camera").simulateLatitude);
});

sceneEl.addEventListener("markerLost", (e) => {
    isMarkerVisible = false;
});

//rotate object when touched with one finger
sceneEl.addEventListener('onefingermove', (e) => {
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