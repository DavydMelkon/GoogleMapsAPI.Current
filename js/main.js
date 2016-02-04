/**
 * Created by Davyd on 02.02.2016.
 */
window.addEventListener("load", function(){
    function initialize() {
        var myLatlng = new google.maps.LatLng(50.44968974, 30.50071);
        var myOptions = {
            zoom: 11,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(document.getElementById("googleMap"), myOptions);
    }
    initialize();
})
/*
function initialize2() {
    var mapProp = {
        center:new google.maps.LatLng(51.508742,-0.120850),
        zoom:5,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}*/
/*
function initialize3() {
    var mapProp = {
        center:new google.maps.LatLng(50.44968974,30.50071),
        zoom:11,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}
google.maps.event.addDomListener(window, 'load', initialize);
initialize3();
    */