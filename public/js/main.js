$(document).ready(function() {
    //set iframe height to window size - navbar
    $('#iframe').height($(window).height() - $('#navbar').height());
    $('#iframe').on( 'load', function() {
        var iframe = document.getElementById("iframe");
        var gltfentity = iframe.contentWindow.document.getElementById("a-entity");
        //set object on click
        $('#car').click((e) => {
            gltfentity.setAttribute('gltf-model', '/gltf/car_model/scene.gltf');
            gltfentity.setAttribute('scale', '0.8 0.8 0.8');
        })
        $('#truck').click((e) => {
            gltfentity.setAttribute('gltf-model', '/gltf/truck_model/scene.gltf');
            gltfentity.setAttribute('scale', '0.3 0.3 0.3');
        })
    });
});