var sceneEl; //scene element
var camera; //camera element
var rotationFactor = 5;
var currentSuggestionIndex = 0;
var currentSuggestions;

$(document).ready((e) => {

    //get camera and scene element
    sceneEl = document.querySelector('a-scene');
    camera = document.querySelector('a-camera');

    //marker not visible at beginning
    let isMarkerVisible = false;
    //redirect on home button
    document
        .querySelector("#homebtn")
        .addEventListener("click", function () {
            window.location.href = "https://correnslab.de";
        });
    //alert help
    document
        .querySelector("#helpbtn")
        .addEventListener("click", function () {
            swal({
                title: "Augmented Reality Partizipation",
                text: 'Scannen Sie einen der “AR”-Marker auf der Corrensstraße und lassen Sie sich so Vorschläge in der realen Welt anzeigen. ' +
                    'Die Objekte können Sie drehen und mit den klassischen Zoom-Gesten vergrößern bzw. verkleinern.\n' +
                    'Wenn ein Marker erkannt wurde, können Sie mit den unteren Pfeilen die Vorschläge wechseln.',
                icon: "info",
            });
        });
    // listener for marker event
    sceneEl.addEventListener("markerFound", (e) => {
        isMarkerVisible = true;
        //get marker id
        let markerID = e.target.attributes.id.nodeValue;
        const marker = document.getElementById(markerID);
        [].forEach.call(document.querySelectorAll('#nextbtn, #prevbtn'), function (el) {
            el.style.visibility = 'visible';
        });
        getMarkerSuggestions(markerID);
        // action when prev button is clicked
        document
            .querySelector("#prevbtn")
            .addEventListener("click", function () {
                marker.innerHTML = "";
                if (currentSuggestionIndex == 0) {
                    currentSuggestionIndex = currentSuggestions.length - 1;
                }
                else currentSuggestionIndex -= 1;
                appendImagetoMarker(currentSuggestions[currentSuggestionIndex].asset.file_path, markerID, currentSuggestions[currentSuggestionIndex].id)
            });
        //action when next button is clicked
        document
            .querySelector("#nextbtn")
            .addEventListener("click", function () {
                marker.innerHTML = "";
                if (currentSuggestionIndex == currentSuggestions.length - 1) {
                    currentSuggestionIndex = 0;
                }
                else currentSuggestionIndex += 1;
                appendImagetoMarker(currentSuggestions[currentSuggestionIndex].asset.file_path, markerID, currentSuggestions[currentSuggestionIndex].id)
            });
    });

    //listener for marker event
    sceneEl.addEventListener("markerLost", (e) => {
        isMarkerVisible = false;
        currentSuggestions = [];
        currentSuggestionIndex = 0;
        [].forEach.call(document.querySelectorAll('#nextbtn, #prevbtn'), function (el) {
            el.style.visibility = 'hidden';
        });
    });

    //rotate object when touched with one finger
    sceneEl.addEventListener('onefingermove', (e) => {
        console.log("onefingermove");
        el = document.querySelector('a-marker > a-image');
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
        el = document.querySelector('a-marker > a-image');
        if (isMarkerVisible) {
            el.object3D.scale.x *=
                1 + e.detail.spreadChange / e.detail.startSpread;
            el.object3D.scale.y *=
                1 + e.detail.spreadChange / e.detail.startSpread;
            el.object3D.scale.z *=
                1 + e.detail.spreadChange / e.detail.startSpread;
        }
    })
})

// ++++++ FUNCTIONS +++++
/**
 * @param  {} markerID 
 */
function getMarkerSuggestions(markerID) {
    $.ajax({
        url: 'https://giv-project10.uni-muenster.de/api/marker/' + markerID + '/suggestion',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            currentSuggestions = data.data;
            currentSuggestions.sort(() => Math.random() - 0.5);
            appendImagetoMarker(currentSuggestions[currentSuggestionIndex].asset.file_path, markerID, currentSuggestions[currentSuggestionIndex].id);
        }
    });
}

/**
 * @param  {String} filepath path to the actual image file
 * @param  {Integer} markerID marker to display the image on
 * @param  {Integer} suggestionID suggestion ID to forward to comment page
 */
function appendImagetoMarker(filepath, markerID, suggestionID) {
    console.log("Marker: " + markerID + " with Suggestion: " + suggestionID);
    // get marker to append image
    const marker = document.getElementById(markerID);
    marker.innerHTML = "";
    //generate new image object and set path
    var entity = document.createElement('a-image');
    var imagesrc = document.createAttribute('src');
    filepath = "/public/storage/" + filepath.split('public/')[1];
    imagesrc.value = filepath;
    //alert(filepath);
    entity.setAttributeNode(imagesrc);
    //set rotation of image
    var rotationAttr = document.createAttribute('rotation');
    rotationAttr.value = "90 0 180";
    entity.setAttributeNode(rotationAttr);
    //set id
    entity.setAttribute('id', suggestionID);
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
}