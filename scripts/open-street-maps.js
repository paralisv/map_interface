// Στα πλαίσια της πτυχιακής εργασίας:
// Διεπαφες Χαρτη στις Web Εφαρμογές
// του Ευάγγελου Παραλή
// Τμηματος Μηχανικών Πληροφορικής Τ.Ε. Λάρισας 


var open_street_map_markers = [];
var cluster = undefined;
var open_street_map_polyline_path = undefined;
var open_street_map_rectangles = [];
var open_street_map_circles = [];
var open_street_map_polygon = undefined;
//----------------------------------------------------------------------
// -------------------------- Map Initialization Feature ---------------
//----------------------------------------------------------------------

// Initialize Map
function init_open_street_map(feature) {
	const greece = [ 39.074, 23.824 ];
	
	if(feature == null){
		var open_street_map = L.map('open_street_map', {
			zoomControl: false,
			attributionControl : false,
		})
		.setView(greece, 5);
	
		// L is the default Leaflet.js Map Object
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(open_street_map);
	}else{
		open_street_map = L.map('open_street_map', {
			attributionControl: true,
			zoomControl: true,
		})
		.setView(greece, 5);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 18,
			minZoom: 3,
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(open_street_map);
	}

	switch (feature) {
		case 'marker': 
			predefined_open_street_maps_markers(open_street_map);
			break;
		case 'infowindow':
			predefined_open_street_maps_info_windows(open_street_map);
			break;
		case 'tooltip':
			predefined_open_street_maps_tooltip(open_street_map);
			break;
		case 'polylines':
			predefined_open_street_maps_polylines(open_street_map);
			break;
		case 'circles':
			predefined_open_street_maps_circles(open_street_map);
			break;
		case 'rectangles':
			predefined_open_street_maps_rectangles(open_street_map);
			break;
		case 'polygons':
			predefined_open_street_maps_polygons(open_street_map);
			break;
		case 'image-overlays':
			predefined_open_street_maps_image_overlays(open_street_map);
			break;
		case 'demo':
			document.getElementById("show-pois").addEventListener("click", () => {
				open_street_map_show_pois(open_street_map);
			});
			document.getElementById("hide-pois").addEventListener("click", () => {
				open_street_map_hide_pois(open_street_map);
			});
			open_street_map.on('click', (mapsClickEvent) => {
				place_open_street_map_marker(mapsClickEvent, open_street_map);
			});
			open_street_map.on('contextmenu', (mapsClickEvent) => {
				place_custom_open_street_map_marker(mapsClickEvent, open_street_map);
			});
			document.getElementById("draw-polylines").addEventListener("click", () => {
				open_street_map_draw_polylines(open_street_map);
			});
			document.getElementById("draw-rectangles").addEventListener("click", () => {
				open_street_map_draw_rectangles(open_street_map);
			});
			document.getElementById("draw-circles").addEventListener("click", () => {
				open_street_map_draw_circles(open_street_map);
			});
			document.getElementById("draw-polygons").addEventListener("click", () => {
				open_street_map_draw_polygons(open_street_map);
			});
			document.getElementById("clear-shapes").addEventListener("click", () => {
				open_street_map_clear_shapes(open_street_map);
			});
			break;
	}
}

//----------------------------------------------------------------------
// -------------------------- Marker Feature ---------------------------
//----------------------------------------------------------------------

function predefined_open_street_maps_markers(open_street_map){
	geopoints.forEach(geopoint => {
		L.marker([geopoint.Latitude, geopoint.Longitude]).addTo(open_street_map);
	})
}

//----------------------------------------------------------------------
// -------------------------- InfoWindow Feature -----------------------
//----------------------------------------------------------------------

// Predefined Marker with Infowindow onClick
function predefined_open_street_maps_info_windows(open_street_map){
	let index = 0;
	geopoints.forEach(geopoint => {
		
		let contentString = 
		'<div id="content">' +
			`<h5 id="firstHeading" class="firstHeading">${geopoint.Title}</h5>` +
			'<div id="bodyContent">' +
				`<p>${geopoint.Description}</p>` +
			"</div>" +
		"</div>";

	
		if(index == 0){
			L.marker([geopoint.Latitude, geopoint.Longitude]).addTo(open_street_map)
			.bindPopup(contentString)
			.openPopup();
		}else{
			L.marker([geopoint.Latitude, geopoint.Longitude]).addTo(open_street_map)
			.bindPopup(contentString)
			
		}
		
		index++;
	});
}

//----------------------------------------------------------------------
// -------------------------- Tooltip Feature -----------------------
//----------------------------------------------------------------------

function predefined_open_street_maps_tooltip(open_street_map){
	geopoints.forEach(geopoint => {
		
			L.marker([geopoint.Latitude, geopoint.Longitude])
			.addTo(open_street_map)
			.bindTooltip(geopoint.Title)
	});
}

//----------------------------------------------------------------------
// -------------------------- Polylines Feature ------------------------
//----------------------------------------------------------------------

function predefined_open_street_maps_polylines(open_street_map){
	var travelPlanCoordinates = [];
	geopoints.forEach(geopoint => {
		travelPlanCoordinates.push({ lat: geopoint.Latitude, lng: geopoint.Longitude });
	});

	var polyline = L.polyline(travelPlanCoordinates, {color: 'red'}).addTo(open_street_map);

	// zoom the map to the polyline
	open_street_map.fitBounds(polyline.getBounds());
}

//----------------------------------------------------------------------
// -------------------------- Circles Feature --------------------------
//----------------------------------------------------------------------

function predefined_open_street_maps_circles(open_street_map) {

	geopoints.forEach(geopoint => {
		L.circle([geopoint.Latitude, geopoint.Longitude], {radius: geopoint.Capacity}).addTo(open_street_map);
	});

}

//----------------------------------------------------------------------
// -------------------------- Rectangles Feature --------------------------
//----------------------------------------------------------------------

function predefined_open_street_maps_rectangles(open_street_map) {
	var bounds = [[geopoints[0].Latitude, geopoints[0].Longitude], [geopoints[1].Latitude, geopoints[1].Longitude]];

	L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(open_street_map);
	open_street_map.fitBounds(bounds);
}

//----------------------------------------------------------------------
// -------------------------- Polygons Feature --------------------------
//----------------------------------------------------------------------

function predefined_open_street_maps_polygons(open_street_map) {
	var latlngs = [];

	geopoints.forEach(geopoint => {
		latlngs.push([ geopoint.Latitude, geopoint.Longitude ]);
	});

	var polygon = L.polygon(latlngs, {color: 'red'}).addTo(open_street_map);

	// zoom the map to the polygon
	open_street_map.fitBounds(polygon.getBounds());
}

//----------------------------------------------------------------------
// -------------------------- Image Overlays Feature -------------------
//----------------------------------------------------------------------

function predefined_open_street_maps_image_overlays(open_street_map) {
	var imageUrl = "./../ancient-greece.jpg";
    imageBounds = [[41.68075941231813, 19.375888049080856], [34.60737710561527, 28.543628959853727]];
	L.imageOverlay(imageUrl, imageBounds).addTo(open_street_map);
}


//----------------------------------------------------------------------
// -------------------------- DEMO--------------------------------------
//----------------------------------------------------------------------

function open_street_map_show_pois(open_street_map){
	open_street_map_hide_pois(open_street_map);

	cluster = L.markerClusterGroup();
	geopoints.forEach(geopoint => {
		let contentString = 
		'<div id="content">' +
			`<h5 id="firstHeading" class="firstHeading">${geopoint.Title}</h5>` +
			'<div id="bodyContent">' +
				`<p>${geopoint.Description}</p>` +
			"</div>" +
		"</div>";

		var marker = L.marker([geopoint.Latitude, geopoint.Longitude])
		.bindPopup(contentString)
		.bindTooltip(geopoint.Title)

		open_street_map_markers.push(marker);
		cluster.addLayer(marker);
		open_street_map.addLayer(cluster);
	});
}

function open_street_map_hide_pois(open_street_map){
	open_street_map_markers.forEach(marker => {
		open_street_map.removeLayer(marker)
	})
	open_street_map_markers = [];
	
	if(cluster != undefined){
		open_street_map.removeLayer(cluster);
		cluster = undefined;
	}
}

// Place Marker
function place_open_street_map_marker(mapsClickEvent, open_street_map) {
	let coordinates = mapsClickEvent.latlng;
    var marker = L.marker([coordinates.lat,coordinates.lng],{draggable:'true'}).addTo(open_street_map);

	open_street_map_markers.push(marker);

	marker.on('click', function(e) {
		L.DomEvent.stopPropagation(e);
	});

	marker.on('dblclick', (markerClickEvent) => {
		open_street_map.removeLayer(markerClickEvent.sourceTarget);
	});
}

// Place Marker
function place_custom_open_street_map_marker(mapsClickEvent, open_street_map) {
	let coordinates = mapsClickEvent.latlng;
    var marker = L.marker([coordinates.lat,coordinates.lng],{
		icon: new L.icon({
			iconUrl: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/info-i_maps.png'
		}),
		draggable:'true'
	})
	.addTo(open_street_map);

	open_street_map_markers.push(marker);

	marker.on('click', function(e) {
		L.DomEvent.stopPropagation(e);
	});

	marker.on('dblclick', (markerClickEvent) => {	
		open_street_map.removeLayer(markerClickEvent.sourceTarget);
	});
}

function open_street_map_draw_polylines(open_street_map){

	if(open_street_map_markers.length != 0){

		open_street_map_clear_shapes(open_street_map);

		var polylineCoordinates = [];
		open_street_map_markers.forEach((marker) => { 
			polylineCoordinates.push(marker.getLatLng());
		})
			
		open_street_map_polyline_path = L.polyline(polylineCoordinates, {color: 'red'}).addTo(open_street_map);
	}
}

function open_street_map_draw_rectangles(open_street_map){
	if(open_street_map_markers.length != 0){

		open_street_map_clear_shapes(open_street_map);

		open_street_map_markers.forEach((marker) => { 
			var bounds = [[marker.getLatLng().lat, marker.getLatLng().lng], [marker.getLatLng().lat - 0.900, marker.getLatLng().lng - 0.900]];
			var rectangle = L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(open_street_map);
			open_street_map_rectangles.push(rectangle);
		})
	}
}

function open_street_map_draw_circles(open_street_map){
	if(open_street_map_markers.length != 0){

		open_street_map_clear_shapes(open_street_map);

		open_street_map_markers.forEach((marker) => { 
			var circle = L.circle([marker.getLatLng().lat, marker.getLatLng().lng], {radius: 30000}).addTo(open_street_map);
			open_street_map_circles.push(circle);
		})
	}
}

function open_street_map_draw_polygons(open_street_map){
	if(open_street_map_markers.length != 0){

		open_street_map_clear_shapes(open_street_map);
		
		var latlngs = [];
		open_street_map_markers.forEach((marker) => { 
			latlngs.push([marker.getLatLng().lat, marker.getLatLng().lng]);
		})

		open_street_map_polygon = L.polygon(latlngs, {color: 'red'}).addTo(open_street_map);
	}
}


function open_street_map_clear_shapes(open_street_map){
	if(open_street_map_polyline_path != undefined){
		open_street_map.removeLayer(open_street_map_polyline_path);
		open_street_map_polyline_path = undefined;
	}

	if(open_street_map_polygon != undefined){
		open_street_map.removeLayer(open_street_map_polygon);
		open_street_map_polygon = undefined;
	}

	if(open_street_map_rectangles != []){
		open_street_map_rectangles.forEach((rec) => {
			open_street_map.removeLayer(rec)
		});
		open_street_map_rectangles = [];
	}

	if(open_street_map_circles != []){
		open_street_map_circles.forEach((circle) => {
			open_street_map.removeLayer(circle)
		});
		open_street_map_circles = [];
	}
}
