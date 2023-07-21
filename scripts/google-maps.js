// Στα πλαίσια της πτυχιακής εργασίας:
// Διεπαφες Χαρτη στις Web Εφαρμογές
// του Ευάγγελου Παραλή
// Τμηματος Μηχανικών Πληροφορικής Τ.Ε. Λάρισας 


// ************************** Google Maps Functions ********************

var google_markers = [];
var google_marker_cluster = undefined;
var google_polyline_path = undefined;
var google_rectangles = [];
var google_circles = [];
var google_polygon = undefined;
//----------------------------------------------------------------------
// -------------------------- Map Initialization Feature ---------------
//----------------------------------------------------------------------

// Initialize Map
function init_google_map(feature) {

	var google_map = new google.maps.Map(document.getElementById("google_map"), {
		zoom: 5,
		center: new google.maps.LatLng(39.074, 23.824),
		disableDefaultUI: true,
	});

	if(feature != null){
		google_map = new google.maps.Map(document.getElementById("google_map"), {
			zoom: 5,
			center: new google.maps.LatLng(39.074, 23.824),
			zoomControl: true,
			mapTypeControl: true,
			scaleControl: true,
			streetViewControl: true,
			rotateControl: true,
			fullscreenControl: true
		});
	}

	switch (feature) {
		case 'marker': 
			predefined_google_map_markers(google_map);
			break;
		case 'infowindow':
			predefined_google_map_info_windows(google_map);
			break;
		case 'tooltip':
			predefined_google_map_tooltip(google_map);
			break;
		case 'polylines':
			predefined_google_map_polylines(google_map);
			break;
		case 'circles':
			predefined_google_map_circles(google_map);
			break;
		case 'rectangles':
			predefined_google_map_rectangles(google_map);
			break;
		case 'polygons':
			predefined_google_map_polygons(google_map);
			break;
		case 'image-overlays':
			predefined_google_map_image_overlays(google_map);
			break;
		case 'demo':
			document.getElementById("show-pois").addEventListener("click", () => {
				google_show_pois(google_map);
			});
			document.getElementById("hide-pois").addEventListener("click", () => {
				google_hide_pois();
			});
			google_map.addListener("click", (mapsClickEvent) => {
				place_google_marker(mapsClickEvent, google_map);
			});
			google_map.addListener('contextmenu', (mapsClickEvent) => {
				place_custom_google_marker(mapsClickEvent, google_map);
			});
			document.getElementById("draw-polylines").addEventListener("click", () => {
				google_draw_polylines(google_map);
			});
			document.getElementById("draw-rectangles").addEventListener("click", () => {
				google_draw_rectangles(google_map);
			});
			document.getElementById("draw-circles").addEventListener("click", () => {
				google_draw_circles(google_map);
			});
			document.getElementById("draw-polygons").addEventListener("click", () => {
				google_draw_polygons(google_map);
			});
			document.getElementById("clear-shapes").addEventListener("click", () => {
				google_clear_shapes(google_map);
			});
			break;
	}
}

//----------------------------------------------------------------------
// -------------------------- Marker Feature ---------------------------
//----------------------------------------------------------------------

function predefined_google_map_markers(google_map){
	geopoints.forEach(geopoint => {
		let marker = new google.maps.Marker({
			position: { lat: geopoint.Latitude, lng: geopoint.Longitude },
			map: google_map
		});
	})
}


//----------------------------------------------------------------------
// -------------------------- InfoWindow Feature -----------------------
//----------------------------------------------------------------------

function predefined_google_map_info_windows(google_map){

	let index = 0;
	geopoints.forEach(geopoint => {
		
		let contentString = 
		'<div id="content">' +
			`<h5 id="firstHeading" class="firstHeading">${geopoint.Title}</h5>` +
			'<div id="bodyContent">' +
				`<p>${geopoint.Description}</p>` +
			"</div>" +
		"</div>";

		let infowindow = new google.maps.InfoWindow({
			content: contentString
		});
	
		let marker = new google.maps.Marker({
			position: { lat: geopoint.Latitude, lng: geopoint.Longitude },
			map: google_map
		});
	
		marker.addListener("click", () => {
			infowindow.open({
				anchor: marker,
				map: google_map,
				shouldFocus: true,
			});
		});
		
		if(index == 0){
			infowindow.open({
				anchor: marker,
				map: google_map,
				shouldFocus: true,
			});
		}

		index++;
	});
}

// Place Infowindow
function placeGoogleInfowindow(coordinates, map) {
	const infowindow = new google.maps.InfoWindow({
		content: dummyInfoWindowtext,
	});
	infowindow.setPosition(coordinates);
	infowindow.open({
		map: map,
		shouldFocus: true,
	});
}

//----------------------------------------------------------------------
// -------------------------- Tooltip Feature ---------------------------
//----------------------------------------------------------------------

// Insert Tooltip
function predefined_google_map_tooltip(google_map) {
	geopoints.forEach(geopoint => {
		let marker = new google.maps.Marker({
			position: { lat: geopoint.Latitude, lng: geopoint.Longitude },
			map: google_map,
			title: geopoint.Title 
		});
	});
}

//----------------------------------------------------------------------
// -------------------------- Polylines Feature ------------------------
//----------------------------------------------------------------------


// Predefined Polylines
function predefined_google_map_polylines(google_map) {

	var travelPlanCoordinates = [];

	geopoints.forEach(geopoint => {
		travelPlanCoordinates.push({ lat: geopoint.Latitude, lng: geopoint.Longitude });
	})

	const travelPath = new google.maps.Polyline({
		path: travelPlanCoordinates,
		geodesic: true,
		strokeColor: "#FF0000",
		strokeOpacity: 1.0,
		strokeWeight: 2,
	});

	travelPath.setMap(google_map);
}

//----------------------------------------------------------------------
//--------------------------- Circles Feature --------------------------
//----------------------------------------------------------------------

// Predefined Circles
function predefined_google_map_circles(google_map) {
	geopoints.forEach(geopoint => {
		var cityCircle = new google.maps.Circle({
				strokeColor: "#FF0000",
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: "#FF0000",
				fillOpacity: 0.35,
				map: google_map,
				center: { lat: geopoint.Latitude, lng: geopoint.Longitude },
				radius: geopoint.Capacity,
			});
	})
}

// ----------------------------------------------------------------------
// -------------------------- Rectangles Feature ------------------------
// ----------------------------------------------------------------------

// Predefined Rectangles
function predefined_google_map_rectangles(google_map) {
	
	var rectangle = new google.maps.Rectangle({
		strokeColor: "#FF0000",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "#FF0000",
		fillOpacity: 0.35,
		google_map,
		bounds: {
			north: geopoints[1].Latitude,
			south:  geopoints[0].Latitude,
			east: geopoints[1].Longitude,
			west: geopoints[0].Longitude,
		}
	});
	rectangle.setMap(google_map);

}


//----------------------------------------------------------------------
// -------------------------- Polygons Feature -----------------------
//----------------------------------------------------------------------

// Predefined Polygons
function predefined_google_map_polygons(google_map) {
	
	// Define the LatLng coordinates for the polygon's path.
	const polygonsCords = [];

	geopoints.forEach(geopoint => {
		polygonsCords.push({ lat: geopoint.Latitude, lng: geopoint.Longitude });
	});

	// Construct the polygon.
	const courtsPolygon = new google.maps.Polygon({
	paths: polygonsCords,
	strokeColor: "#FF0000",
	strokeOpacity: 0.8,
	strokeWeight: 2,
	fillColor: "#FF0000",
	fillOpacity: 0.35,
	});

	courtsPolygon.setMap(google_map);
}

//----------------------------------------------------------------------
// -------------------------- Image Overlays Feature -------------------
//----------------------------------------------------------------------

// Predefined Polygons
function predefined_google_map_image_overlays(google_map) {
	
	var imageBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(34.60737710561527, 19.375888049080856), //SW
		new google.maps.LatLng(41.68075941231813, 28.543628959853727)  //NE
	);

	historicalOverlay = new google.maps.GroundOverlay(
		"./../ancient-greece.jpg",
		imageBounds
	);

	historicalOverlay.setMap(google_map);
}

//----------------------------------------------------------------------
// -------------------------- DEMO--------------------------------------
//----------------------------------------------------------------------

function google_show_pois(google_map){

	google_hide_pois();

	geopoints.forEach(geopoint => {
		
		let contentString = 
		'<div id="content">' +
			`<h5 id="firstHeading" class="firstHeading">${geopoint.Title}</h5>` +
			'<div id="bodyContent">' +
				`<p>${geopoint.Description}</p>` +
			"</div>" +
		"</div>";

		let infowindow = new google.maps.InfoWindow({
			content: contentString
		});
	
		let marker = new google.maps.Marker({
			position: { lat: geopoint.Latitude, lng: geopoint.Longitude },
			map: google_map,
			title: geopoint.Title
		});
	
		marker.addListener("click", () => {
			infowindow.open({
				anchor: marker,
				map: google_map,
				shouldFocus: true,
			});
		});

		google_markers.push(marker);
	});
	google_marker_cluster = new MarkerClusterer(google_map, google_markers, {
		imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
	});
}

function google_hide_pois(){
	google_markers.forEach( marker => {
		marker.setMap(null);
	})
	google_markers = [];

	if(google_marker_cluster != undefined){
		google_marker_cluster.clearMarkers();
		google_marker_cluster = undefined;
	}
}

// Place Marker
function place_google_marker(mapsClickEvent, google_map) {
	let coordinates = mapsClickEvent.latLng;
	let marker = new google.maps.Marker({
		position: coordinates,
		map: google_map,
		draggable:true,
	});
	google_markers.push(marker);

	marker.addListener('dblclick', (markerClickEvent) => {
		marker.setMap(null)
	});
}

// Place custom Marker
function place_custom_google_marker(mapsClickEvent, google_map) {
	let coordinates = mapsClickEvent.latLng;
	let marker = new google.maps.Marker({
		position: coordinates,
		icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/info-i_maps.png',
		map: google_map,
		draggable:true,
	});

	google_markers.push(marker);

	marker.addListener('dblclick', (markerClickEvent) => {
		marker.setMap(null)
	});
}

function google_draw_polylines(google_map){
	if(google_markers.length != 0){

		google_clear_shapes(google_map);

		var polylineCoordinates = [];
		google_markers.forEach( (marker) => { 
			polylineCoordinates.push(marker.getPosition());
		})
	
		google_polyline_path = new google.maps.Polyline({
			path: polylineCoordinates,
			geodesic: true,
			strokeColor: "#FF0000",
			strokeOpacity: 1.0,
			strokeWeight: 2,
		});
		
		google_polyline_path.setMap(google_map);
	}
}

function google_draw_rectangles(google_map){
	if(google_markers.length != 0){

		google_clear_shapes(google_map);

		google_markers.forEach( (marker) => { 
			var rectangle = new google.maps.Rectangle({
				strokeColor: "#FF0000",
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: "#FF0000",
				fillOpacity: 0.35,
				google_map,
				bounds: {
				  north: parseFloat(marker.getPosition().lat()),
				  south: parseFloat(marker.getPosition().lat() - 0.800),
				  east: parseFloat(marker.getPosition().lng()),
				  west: parseFloat(marker.getPosition().lng() - 0.800),
				},
			  });
			rectangle.setMap(google_map);
			google_rectangles.push(rectangle);
		});
	}
}

function google_draw_circles(google_map){
	if(google_markers.length != 0){

		google_clear_shapes(google_map);

		google_markers.forEach( (marker) => { 
			var circle = new google.maps.Circle({
				strokeColor: "#FF0000",
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: "#FF0000",
				fillOpacity: 0.35,
				map: google_map,
				center: { lat: marker.getPosition().lat(), lng: marker.getPosition().lng() },
				radius: 30000,
			});  
			circle.setMap(google_map);
			google_circles.push(circle);
		});
	}
}

function google_draw_polygons(google_map){
	if(google_markers.length != 0){

		google_clear_shapes(google_map);

		const polygonsCords = [];
		google_markers.forEach( (marker) => { 
			polygonsCords.push({ lat: marker.getPosition().lat(), lng: marker.getPosition().lng() });
		});

		// Construct the polygon.
		google_polygon = new google.maps.Polygon({
			paths: polygonsCords,
			strokeColor: "#FF0000",
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: "#FF0000",
			fillOpacity: 0.35,
		});

		google_polygon.setMap(google_map);
	}
}


function google_clear_shapes(google_map){
	if(google_polyline_path != undefined){
		google_polyline_path.setMap(null);
		google_polyline_path = undefined;
	}
	
	if(google_polygon != undefined){
		google_polygon.setMap(null);
		google_polygon = undefined;
	}
	
	if(google_rectangles != []){
		google_rectangles.forEach( (rec) => {
			rec.setMap(null);
		})
		google_rectangles = [];
	}

	if(google_circles != []){
		google_circles.forEach( (circle) => {
			circle.setMap(null);
		})
		google_circles = [];
	}
}