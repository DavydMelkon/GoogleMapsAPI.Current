/**
 * Created by Davyd on 02.02.2016.
 */
function initialize() {
    var myLatlng = new google.maps.LatLng(-34.397, 150.644);
    var myOptions = {
        zoom: 8,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
}
function initialize2() {
    var mapProp = {
        center:new google.maps.LatLng(51.508742,-0.120850),
        zoom:5,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}