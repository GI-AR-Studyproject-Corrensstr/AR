var sceneEl;
var camera;
var el;
var rotationFactor = 5;

$(document).ready((e) => {

    // action when prev button is clicked
    document
        .querySelector("#prevbtn")
        .addEventListener("click", function () {
            alert("Prev");
        });
    // action when next button is clicked
    document
        .querySelector("#nextbtn")
        .addEventListener("click", function () {
            alert("Next");
        });

    //get camera and scene element
    sceneEl = document.querySelector('a-scene');
    camera = document.querySelector('a-camera');

    //marker not visible at beginning
    let isMarkerVisible = false;

    // listener for marker event
    sceneEl.addEventListener("markerFound", (e) => {
        isMarkerVisible = true;
        //get marker id
        let markerName = e.target.attributes.id.nodeValue;
        console.log("marker found", markerName);
        console.log(sceneEl);
    });

    //listener for marker event
    sceneEl.addEventListener("markerLost", (e) => {
        isMarkerVisible = false;
        console.log("marker lost");
    });

    //rotate object when touched with one finger
    sceneEl.addEventListener('onefingermove', (e) => {
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
    appendMarkerToScene('ifgi-marker', 'pattern/ifgi-pattern.patt');
    appendImagetoMarker(asset1, 'ifgi-marker');
})


// ++++++ ASSET FUNCTIONS +++++
function getAllAssets() {
    $.ajax({
        url: "https://giv-project10:3001/asset",
        type: 'GET',
        dataType: 'json', // added data type
        success: function (res) {
            for (let index = 0; index < res.data.length; index++) {
                console.log(res.data[index]);
                appendObjectToScene(res.data[index]);
            }
        }
    });
}

function getAssetById(ID) {
    $.ajax({
        url: "https://giv-project10:3001/asset/" + ID,
        type: 'GET',
        dataType: 'json', // added data type
        success: function (res) {
            console.log(res);
        },
        error: function (err) {
            console.log(err);
        }
    });
}

// ++++++ MARKER FUNCTIONS +++++
function getAllMarkers() {
    $.ajax({
        url: "https://giv-project10:3001/marker",
        type: 'GET',
        dataType: 'json', // added data type
        success: function (res) {
            console.log(res);
            // for (let index = 0; index < res.data.length; index++) {
            //     console.log(res.data[index]);
            // }
        }
    });
}

function getMarkerById(ID) {
    $.ajax({
        url: "https://giv-project10:3001/marker/" + ID,
        type: 'GET',
        dataType: 'json', // added data type
        success: function (res) {
            console.log(res);
        },
        error: function (err) {
            console.log(err);
        }
    });
}


// +++++++ ADD ELEMENTS TO SCENE +++++++++
//function that adds a marker to the scene
function appendMarkerToScene(id, url, position) {
    const scene = document.querySelector('a-scene');
    var marker = document.createElement('a-marker');

    marker.setAttribute('type', 'pattern');
    marker.setAttribute('preset', 'custom');
    marker.setAttribute('url', url);
    marker.setAttribute('id', id);
    scene.appendChild(marker);
}

function appendImagetoMarker(image, markerID) {
    // get marker to append image
    const marker = document.getElementById(markerID);
    //generate new image object and set path
    var entity = document.createElement('a-image');
    var imagesrc = document.createAttribute('src');
    imagesrc.value = image.filepath;
    entity.setAttributeNode(imagesrc);
    //set rotation of image
    var rotationAttr = document.createAttribute('rotation');
    rotationAttr.value = "90 0 180";
    entity.setAttributeNode(rotationAttr);
    //set id
    entity.setAttribute('id', image.name);
    //set position
    var positionAttr = document.createAttribute('position');
    positionAttr.value = "0 0 0";
    entity.setAttributeNode(positionAttr);
    // activate gesture-handler
    var gesturehandler = document.createAttribute('gesture-handler');
    entity.setAttributeNode(gesturehandler);
    //set scale
    var scaleAttr = document.createAttribute('scale');
    scaleAttr.value = "1 1 1";
    entity.setAttributeNode(scaleAttr);
    marker.appendChild(entity);

    console.log(entity);
}



// function that adds an oject to the scene
function appendObjectToScene(object) {
    // get marker for object
    const marker = document.getElementById("ifgi-marker");
    var entity;
    switch (object.type) {
        case "3D_asset":
            //generate new gltf object and set path
            entity = document.createElement('a-gltf-model');
            var gltfmodel = document.createAttribute('gltf-model');
            //gltfmodel.value = "/gltf/default_objects/tree_small.glb";
            entity.setAttributeNode(gltfmodel);

            //set id
            entity.setAttribute('id', object.name);
            //set position
            var positionAttr = document.createAttribute('position');
            positionAttr.value = "0 1 0";
            entity.setAttributeNode(positionAttr);
            // activate gesture-handler
            var gesturehandler = document.createAttribute('gesture-handler');
            entity.setAttributeNode(gesturehandler);
            //set scale
            var scaleAttr = document.createAttribute('scale');
            scaleAttr.value = "1 1 1";
            entity.setAttributeNode(scaleAttr);

            console.log(entity);
            marker.appendChild(entity);
            break;
        case "image":
            //generate new image object and set path
            entity = document.createElement('a-image');
            var imagesrc = document.createAttribute('src');
            //imagesrc.value = "/img/gartenlaube.jpg";
            entity.setAttributeNode(imagesrc);
            //set rotation of image
            var rotationAttr = document.createAttribute('rotation');
            rotationAttr.value = "90 0 180";
            entity.setAttributeNode(rotationAttr);

            //set id
            entity.setAttribute('id', object.name);
            //set position
            var positionAttr = document.createAttribute('position');
            positionAttr.value = "1 1 0";
            entity.setAttributeNode(positionAttr);
            // activate gesture-handler
            var gesturehandler = document.createAttribute('gesture-handler');
            entity.setAttributeNode(gesturehandler);
            //set scale
            var scaleAttr = document.createAttribute('scale');
            scaleAttr.value = "1 1 1";
            entity.setAttributeNode(scaleAttr);

            console.log(entity);
            marker.appendChild(entity);
            break;
    }
}

var suggestion1 = {
    "name": "test1",
    "marker": "ifgi-marker",
    "asset_id": 1
}

var suggestion2 = {
    "name": "test2",
    "marker": "ifgi-marker",
    "asset_id": 2
}

var asset1 = {
    "id": 1,
    "name": "xyz",
    "filepath": "/img/uploads/asset1.jpg"
}

var asset2 = {
    "id": 2,
    "name": "xyz",
    "filepath": "/img/asset2.png"
}