/**
 * Created by Davyd on 02.02.2016.
 */
window.addEventListener("load", function(){

    var kmlsrc = 'http://beta-gmapsapi.esy.es/kml/test.kml';

    function initialize() {
        var myLatlng = new google.maps.LatLng(50.44968974, 30.50071);
        var myOptions = {
            zoom: 11,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("googleMap"), myOptions);

        //KML
        loadKmlLayer(map);

        /*xml = new KmlMapParser({ map: map,
            //zoom: 14,
            kml: 'kml/test.kml',
            showSidebar: false,
            showFolders: false,
            showSidebarDescriptions: false,
            showSidebarBubble: false,
            showRootName: false,
            showImageShadow: false
        });*/

        //Navigation
        var directionsRendererOptions={};
        directionsRendererOptions.draggable=false;
        directionsRendererOptions.hideRouteList=true;
        directionsRendererOptions.suppressMarkers=false;
        directionsRendererOptions.preserveViewport=false;
        var directionsRenderer=new google.maps.DirectionsRenderer(directionsRendererOptions);
        var directionsService=new google.maps.DirectionsService();

        //Adding a fullscreen button
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(FullScreenControl(map, ['Full screen'], ['Exit full screen']));

        //Adding a searchbox
        // Create the search box and link it to the UI element.
        /*var input2 = document.getElementById("pac-input");
        var searchBox = new google.maps.places.SearchBox(input2);
         map.controls[google.maps.ControlPosition.TOP_LEFT].push(input2);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
            searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            // Clear out the old markers.
            markers.forEach(function (marker) {
                marker.setMap(null);
            });
            markers = [];

            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function (place) {
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                    map: map,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location
                }));

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });*/


        //Building a contextmenu
        var contextMenuOptions={};
        contextMenuOptions.classNames={menu:'context_menu', menuSeparator:'context_menu_separator'};

        //	create an array of ContextMenuItem objects
        //	an 'id' is defined for each of the four directions related items
        var menuItems=[];
        menuItems.push({className:'context_menu_item', eventName:'add_marker_click', id:'addMarkerItem', label:'Add marker..'});
        menuItems.push({});
        menuItems.push({className:'context_menu_item', eventName:'directions_origin_click', id:'directionsOriginItem', label:'Directions from here'});
        menuItems.push({className:'context_menu_item', eventName:'directions_destination_click', id:'directionsDestinationItem', label:'Directions to here'});
        menuItems.push({className:'context_menu_item', eventName:'clear_directions_click', id:'clearDirectionsItem', label:'Clear directions'});
        menuItems.push({className:'context_menu_item', eventName:'get_directions_click', id:'getDirectionsItem', label:'Get directions'});
        //	a menuItem with no properties will be rendered as a separator
        menuItems.push({});
        menuItems.push({className:'context_menu_item', eventName:'zoom_in_click', label:'Zoom in'});
        menuItems.push({className:'context_menu_item', eventName:'zoom_out_click', label:'Zoom out'});
        menuItems.push({});
        menuItems.push({className:'context_menu_item', eventName:'center_map_click', label:'Center map here'});
        contextMenuOptions.menuItems=menuItems;

        var contextMenu=new ContextMenu(map, contextMenuOptions);

        google.maps.event.addListener(map, 'rightclick', function(mouseEvent){
            contextMenu.show(mouseEvent.latLng);
        });

        //	create markers to show directions origin and destination
        //	both are not visible by default
        var markerOptions={};
        //markerOptions.icon='http://www.google.com/intl/en_ALL/mapfiles/markerA.png';
        markerOptions.icon='http://gmapsapi.esy.es/images/markers/markerA.png';
        markerOptions.map=null;
        markerOptions.position=new google.maps.LatLng(0, 0);
        markerOptions.title='Directions origin';

        var originMarker=new google.maps.Marker(markerOptions);

        markerOptions.icon='http://gmapsapi.esy.es/images/markers/markerB.png';
        markerOptions.title='Directions destination';
        var destinationMarker=new google.maps.Marker(markerOptions);


        var diagForm = document.getElementById('dialog-form');
        var createMarkerBtn = document.getElementById('createMarkerBtn');

        //	listen for the ContextMenu 'menu_item_selected' event
        google.maps.event.addListener(contextMenu, 'menu_item_selected', function(latLng, eventName){
            switch(eventName){
                case 'add_marker_click':
                    //HERE WILL BE MANIPULATION WITH ADDING A MARKER
                    diagForm.classList.add('open');
                    window.scrollBy(0,300);

                    document.getElementById('coordinatesFromJS').value = latLng;

                    createMarkerBtn.addEventListener("click", function(e) {
                        e.preventDefault();

                        var markerName = document.getElementById('markerName').value;
                        var markerDescription = document.getElementById('description').value;
                        var selectedMarker = document.getElementById('selectionBox').value;
                        var newPositionOfMarker = latLng;

                        var createdMarkerOption = {};
                        createdMarkerOption.map = null;
                        createdMarkerOption.position = new google.maps.LatLng(0,0);
                        switch (selectedMarker){
                            case 'bar': createdMarkerOption.icon = 'http://gmapsapi.esy.es/images/markers/bar.png';
                                break;
                            case 'cafe': createdMarkerOption.icon = 'http://gmapsapi.esy.es/images/markers/cafe.png';
                                break;
                            case 'cinema': createdMarkerOption.icon = 'http://gmapsapi.esy.es/images/markers/cinema.png';
                                break;
                            case 'theater': createdMarkerOption.icon = 'http://gmapsapi.esy.es/images/markers/theater.png';
                                break;
                            case 'restaurant': createdMarkerOption.icon = 'http://gmapsapi.esy.es/images/markers/restaurant.png';
                                break;
                            case 'carousel': createdMarkerOption.icon = 'http://gmapsapi.esy.es/images/markers/carousel.png';
                                break;
                            case 'church': createdMarkerOption.icon = 'http://gmapsapi.esy.es/images/markers/church.png';
                                break;
                            case 'monument': createdMarkerOption.icon = 'http://gmapsapi.esy.es/images/markers/monument.png';
                                break;
                            case 'museum': createdMarkerOption.icon = 'http://gmapsapi.esy.es/images/markers/museum.png';
                                break;
                            case 'park': createdMarkerOption.icon = 'http://gmapsapi.esy.es/images/markers/park.png';
                                break;
                            case 'smoky': createdMarkerOption.icon = 'http://gmapsapi.esy.es/images/markers/smoky.png';
                                break;
                            case 'fastfood': createdMarkerOption.icon = 'http://gmapsapi.esy.es/images/markers/fastfood.png';
                                break;
                        }
                        createdMarkerOption.title = markerName;

                        var infowindow = new google.maps.InfoWindow;
                        infowindow.content = markerDescription;

                        createdMarkerOption.content = markerDescription;

                        var createdMarker = new google.maps.Marker(createdMarkerOption);
                        createdMarker.setPosition(newPositionOfMarker);
                        if(!createdMarker.getMap()){
                            /*if (createdMarker && createdMarker.setPosition) {
                                createdMarker.setMap(null);
                            }*/
                            createdMarker.setMap(map);
                        }
                        //alert(newPositionOfMarker);
                        console.log(newPositionOfMarker);
                        newPositionOfMarker = null;
                        diagForm.classList.remove('open');
                        window.scrollBy(0,-300);

                        //window.open('http://ukr.net');
                        return false;
                    });

                    //
                    break;
                case 'directions_origin_click':
                    originMarker.setPosition(latLng);
                    //console.log(latLng);
                    if(!originMarker.getMap()){
                        originMarker.setMap(map);
                    }
                    break;
                case 'directions_destination_click':
                    destinationMarker.setPosition(latLng);
                    if(!destinationMarker.getMap()){
                        destinationMarker.setMap(map);
                    }
                    break;
                case 'clear_directions_click':
                    directionsRenderer.setMap(null);
                    //	set CSS styles to defaults
                    document.getElementById('clearDirectionsItem').style.display='';
                    document.getElementById('directionsDestinationItem').style.display='';
                    document.getElementById('directionsOriginItem').style.display='';
                    document.getElementById('getDirectionsItem').style.display='';
                    break;
                case 'get_directions_click':
                    var directionsRequest={};
                    directionsRequest.destination=destinationMarker.getPosition();
                    directionsRequest.origin=originMarker.getPosition();
                    directionsRequest.travelMode=google.maps.TravelMode.DRIVING;

                    directionsService.route(directionsRequest, function(result, status){
                        if(status===google.maps.DirectionsStatus.OK){
                            //	hide the origin and destination markers as the DirectionsRenderer will render Markers itself
                            originMarker.setMap(null);
                            destinationMarker.setMap(null);
                            directionsRenderer.setDirections(result);
                            directionsRenderer.setMap(map);
                            //	hide all but the 'Clear directions' menu item
                            document.getElementById('clearDirectionsItem').style.display='block';
                            document.getElementById('directionsDestinationItem').style.display='none';
                            document.getElementById('directionsOriginItem').style.display='none';
                            document.getElementById('getDirectionsItem').style.display='none';
                        } else {
                            alert('Sorry, the map was unable to obtain directions.\n\nThe request failed with the message: '+status);
                        }
                    });
                    break;
                case 'zoom_in_click':
                    map.setZoom(map.getZoom()+1);
                    break;
                case 'zoom_out_click':
                    map.setZoom(map.getZoom()-1);
                    break;
                case 'center_map_click':
                    map.panTo(latLng);
                    break;
            }
            if(originMarker.getMap() && destinationMarker.getMap() && document.getElementById('getDirectionsItem').style.display===''){
                //	display the 'Get directions' menu item if it is not visible and both directions origin and destination have been selected
                document.getElementById('getDirectionsItem').style.display='block';
            }
        });

        /*google.maps.event.addListener(createdMarker, 'click', function() {
            infowindow.open(map,createdMarker);
        });*/
    }
    initialize();
    //var kmlsrc = 'http://beta-gmapsapi.esy.es/kml/test.kml';

    function loadKmlLayer(map) {
        var kmlLayer = new google.maps.KmlLayer({
            url: 'http://beta-gmapsapi.esy.es/kml/test2.kml',
            //url: 'https://drive.google.com/uc?export=download&id=0BzpDYyWwZtNzakptcnY2SEwwMUE',
            suppressInfoWindows: false,
            preserveViewport: true,
            map: map
        });
        /*kmlLayer.addListener('click', function(kmlEvent) {
            var infowindow = new google.maps.InfoWindow({
                content:kmlEvent.futureData.descrition
            });
            infowindow.open(map, kmlLayer);
        });*/
        /*google.maps.event.addListener(kmlLayer, 'click', function(event) {
            var content = event.featureData.infoWindowHtml;
            var testimonial = document.getElementById('capture');
            testimonial.innerHTML = content;
        });*/
    }

    google.maps.event.addDomListener(window, 'load', initialize);
})
