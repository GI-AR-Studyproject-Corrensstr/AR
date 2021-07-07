var sceneEl;
var camera;
var el;
var rotationFactor = 5;

$(document).ready((e) => {
    sceneEl = document.querySelector('a-scene');
    camera = document.querySelector('a-camera');

    console.log(sceneEl);

    let isMarkerVisible = false;

    // listener for marker event
    sceneEl.addEventListener("markerFound", (e) => {
        isMarkerVisible = true;
        //get marker id
        let markerName = e.target.attributes.id.nodeValue;
        console.log("marker found", markerName);
    });

    //listener for marker event
    sceneEl.addEventListener("markerLost", (e) => {
        isMarkerVisible = false;
        console.log("marker lost");
    });

    //rotate object when touched with one finger
    sceneEl.addEventListener('onefingermove', (e) => {

        //TODO Dynamisch Elemente suchen
        el = document.querySelector('a-image');
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
        console.log("twofingermove");
        el = document.querySelector('a-image');
        if (isMarkerVisible) {
            this.scaleFactor *=
                1 + e.detail.spreadChange / e.detail.startSpread;
        }
    })

    appendMarkerToScene('ifgi-marker', 'pattern/ifgi-pattern.patt')
    //appendObjectToScene("gltf", "gartenlaube", "0 0 0", "0.3 0.3 0.3", "/gltf/truck_model/scene.gltf", "ifgi-marker")
    appendObjectToScene('image', 'gartenlaube', '0 0 0', '2 2 2', '/img/gartenlaube.jpg', 'ifgi-marker');
})

// AFRAME.registerComponent('log', {  
//     init: function () {  
//        console.log(this.el);  // Reference to the scene element.
//     }  
// });



//function that adds a marker to the scene
function appendMarkerToScene(id, url, position) {
    const scene = document.querySelector('a-scene');
    var marker = document.createElement('a-marker');

    marker.setAttribute('type', 'pattern');
    marker.setAttribute('preset', 'custom');
    marker.setAttribute('url', url);
    marker.setAttribute('id', id);
    console.log(marker);
    scene.appendChild(marker);
}



// function that adds an oject to the scene
function appendObjectToScene(type, id, position, scale, src, markerid) {
    // get marker for object
    const marker = document.getElementById(markerid);
    var entity;
    switch (type) {
        case "gltf":
            //generate new gltf object and set path
            entity = document.createElement('a-gltf-model');
            var gltfmodel = document.createAttribute('gltf-model');
            gltfmodel.value = src;
            entity.setAttributeNode(gltfmodel);
            break;
        case "image":
            //generate new image object and set path
            entity = document.createElement('a-image');
            var imagesrc = document.createAttribute('src');
            imagesrc.value = src;
            entity.setAttributeNode(imagesrc);
            //set rotation of image
            var rotationAttr = document.createAttribute('rotation');
            rotationAttr.value = "90 0 180";
            entity.setAttributeNode(rotationAttr);
            break;
    }

    //set id
    entity.setAttribute('id', id);
    //set position
    var positionAttr = document.createAttribute('position');
    positionAttr.value = position;
    entity.setAttributeNode(positionAttr);
    // activate gesture-handler
    var gesturehandler = document.createAttribute('gesture-handler');
    entity.setAttributeNode(gesturehandler);
    //set scale
    var scaleAttr = document.createAttribute('scale');
    scaleAttr.value = scale;
    entity.setAttributeNode(scaleAttr);

    console.log(entity);
    marker.appendChild(entity);
}

//example marker1
var marker1 = {
    "name": "Mustermarker",
    "path": "/kdfjh/jdfhxb.patt",
    "position": "X Y Z"
}
//example object1
var object1 = {
    type: "gltf",
    name: "element",
    position: "0 0 0",
    scale: "1 1 1",
    path: "/dgvdx/sjfh.gltf",
    marker: "markerId"
}

var template = {
    name: String,
    type: String,
    position: String,
    path: String
}
