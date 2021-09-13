var sceneEl; //scene element
var camera; //camera element
var rotationFactor = 5;
var currentSuggestionIndex = 0;
var currentSuggestions; // latest list of suggestions from @currentMarkerID
var currentMarkerID; // latest recognizes marker

$(document).ready((e) => {

    //get camera and scene element
    sceneEl = document.querySelector('a-scene');
    camera = document.querySelector('a-camera');

    //marker not visible at beginning
    let isMarkerVisible = false;

    // listener for marker event
    sceneEl.addEventListener("markerFound", (e) => {
        isMarkerVisible = true;
        //get marker id
        let markerID = e.target.attributes.id.nodeValue;
        var marker = document.getElementById(markerID);
        [].forEach.call(document.querySelectorAll('.surroundbottom, .surroundtop'), function (el) {
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
        document
            .querySelector("#commentbtn")
            .addEventListener("click", function () {
                var forwardToID = document.querySelector("a-marker > a-image").id;
                //TODO grab current asset id
                alert('Forward to suggestion overview with ID ' + forwardToID);
            });
    });

    //listener for marker event
    sceneEl.addEventListener("markerLost", (e) => {
        isMarkerVisible = false;
        //currentSuggestions = [];
        currentSuggestionIndex = 0;
        [].forEach.call(document.querySelectorAll('.surroundtop, .surroundbottom'), function (el) {
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
            this.scaleFactor *=
                1 + e.detail.spreadChange / e.detail.startSpread;
        }
    })
})


// ++++++ FUNCTIONS +++++
/**
 * @param  {} markerID 
 */
function getMarkerSuggestions(markerID) {
    console.log('Marker: ' + markerID);
    if (markerID == currentMarkerID) {
        appendImagetoMarker(currentSuggestions[currentSuggestionIndex].asset.file_path, markerID, currentSuggestions[currentSuggestionIndex].id);
    }
    else {
        $.ajax({
            url: 'https://giv-project10.uni-muenster.de:3001/marker/' + markerID + '/suggestion',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                currentSuggestions = [];
                currentSuggestions = data.data;
                currentSuggestions.sort(() => Math.random() - 0.5);
                appendImagetoMarker(currentSuggestions[currentSuggestionIndex].asset.file_path, markerID, currentSuggestions[currentSuggestionIndex].id);
            }
        });
        currentMarkerID = markerID;
    }
}

/**
 * @param  {String} filepath path to the actual image file
 * @param  {Integer} markerID marker to display the image on
 * @param  {Integer} suggestionID suggestion ID to forward to comment page
 */
function appendImagetoMarker(filepath, markerID, suggestionID) {
    console.log("Appending Suggestion with ID: " + suggestionID + " and Filepath: " + filepath + " to Marker with ID: " + markerID);
    // get marker to append image
    const marker = document.getElementById(markerID);
    marker.innerHTML = "";
    //generate new image object and set path
    var entity = document.createElement('a-image');
    var imagesrc = document.createAttribute('src');
    imagesrc.value = filepath;
    imagesrc.value = "/img/uploads/vorschlagCorrensLab.png"; // DELETE LATER
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

    console.log(entity);
}