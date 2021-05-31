const sceneEl = document.getElementById('scene');
const el = document.getElementById('a-entity')
var rotationFactor = 5;

let isMarkerVisible;

sceneEl.addEventListener("markerFound", (e) => {
    isMarkerVisible = true;
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
