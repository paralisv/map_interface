
// Στα πλαίσια της πτυχιακής εργασίας:
// Διεπαφές Χάρτη στις Web Εφαρμογές
// του Ευάγγελου Παραλή
// Τμηματος Μηχανικών Πληροφορικής Τ.Ε. Λάρισας 

const volosDescription = "Volos is a coastal port city in Thessaly situated midway on the Greek mainland, about 330 kilometres north of Athens and 220 kilometres south of Thessaloniki. It is the sixth most populous city of Greece, and the capital of the Magnesia regional unit of the Thessaly Region.";
const dummyInfoWindowtext = "This is a dummy text!";

// ************************** Google **************************

const google_maps_code_snippets = [

`var google_map = new google.maps.Map(document.getElementById("google_map"), {
	zoom: 6,
	center: new google.maps.LatLng(39.074, 23.824),
	disableDefaultUI: true,
});`,

`var google_map = new google.maps.Map(document.getElementById("google_map"), {
	zoom: 6,
	center: new google.maps.LatLng(39.074, 23.824),
	zoomControl: true,
	mapTypeControl: true,
	scaleControl: true,
	streetViewControl: true,
	rotateControl: true,
	fullscreenControl: true
});`,

`let marker = new google.maps.Marker({
	position: { lat: geopoint.Latitude, lng: geopoint.Longitude },
	map: google_map
});`,

`let contentString = "Text you want to display";

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
});`,

`let marker = new google.maps.Marker({
	position: { lat: geopoint.Latitude, lng: geopoint.Longitude },
	map: google_map,
	title: geopoint.Title 
});`,

`var travelPlanCoordinates = [];

geopoints.forEach(geopoint => {
	travelPlanCoordinates.push({ lat: geopoint.Latitude, lng: geopoint.Longitude });
});

const travelPath = new google.maps.Polyline({
	path: travelPlanCoordinates,
	geodesic: true,
	strokeColor: "#FF0000",
	strokeOpacity: 1.0,
	strokeWeight: 2,
});

travelPath.setMap(google_map);`,


`geopoints.forEach(geopoint => {
	var circle = new google.maps.Circle({
			strokeColor: "#FF0000",
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: "#FF0000",
			fillOpacity: 0.35,
			map: google_map,
			center: { lat: geopoint.Latitude, lng: geopoint.Longitude },
			radius: geopoint.Capacity,
		});
});`,

`var rectangle = new google.maps.Rectangle({
	strokeColor: "#FF0000",
	strokeOpacity: 0.8,
	strokeWeight: 2,
	fillColor: "#FF0000",
	fillOpacity: 0.35,
	google_map,
	bounds: {
		north: geopoints[0].Latitude,
		south:  geopoints[0].Longitude,
		east: geopoints[1].Latitude,
		west: geopoints[1].Longitude,
	}
});

rectangle.setMap(google_map);`,

`// Define the LatLng coordinates for the polygon's path.
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

courtsPolygon.setMap(google_map);`,

`var imageBounds = new google.maps.LatLngBounds(
	new google.maps.LatLng(34.60737710561527, 19.375888049080856), //SW
	new google.maps.LatLng(41.68075941231813, 28.543628959853727)  //NE
);

historicalOverlay = new google.maps.GroundOverlay(
	"./../ancient-greece.jpg",
	imageBounds
);

historicalOverlay.setMap(google_map);`
];


// ************************** Open Street Maps **************************

const os_maps_code_snippets = [
`var greece = [ 39.074, 23.824 ];
var open_street_map = L.map('open_street_map', {
	zoomControl: false,
	attributionControl : false,
})
.setView(greece, 6);

// L is the default Leaflet.js Map Object
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(open_street_map);`,

`var greece = [ 39.074, 23.824 ];
var open_street_map = L.map('open_street_map', {
	attributionControl: true,
	zoomControl: true,
})
.setView(greece, 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 18,
	minZoom: 3,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(open_street_map);`,

`L.marker([geopoint.Latitude, geopoint.Longitude]).addTo(open_street_map);`,

`let contentString = "Text you want to display";

L.marker([geopoint.Latitude, geopoint.Longitude]).addTo(open_street_map)
.bindPopup(contentString)`,

`L.marker([geopoint.Latitude, geopoint.Longitude])
.addTo(open_street_map)
.bindTooltip(geopoint.Title)`,

`var travelPlanCoordinates = [];
geopoints.forEach(geopoint => {
	travelPlanCoordinates.push({ lat: geopoint.Latitude, lng: geopoint.Longitude });
});

var polyline = L.polyline(travelPlanCoordinates, {color: 'red'}).addTo(open_street_map);

// zoom the map to the polyline
map.fitBounds(polyline.getBounds());`,

`geopoints.forEach(geopoint => {
	L.circle([geopoint.Latitude, geopoint.Longitude], {radius: geopoint.Capacity}).addTo(open_street_map);
});`,

`var bounds = [[geopoints[0].Latitude, geopoints[0].Longitude], [geopoints[1].Latitude, geopoints[1].Longitude]];

L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(open_street_map);
open_street_map.fitBounds(bounds);`,

`var latlngs = [];

geopoints.forEach(geopoint => {
	latlngs.push([ geopoint.Latitude, geopoint.Longitude ]);
});

var polygon = L.polygon(latlngs, {color: 'red'}).addTo(open_street_map);

// zoom the map to the polygon
open_street_map.fitBounds(polygon.getBounds());`,

`var imageUrl = "./../ancient-greece.jpg";
imageBounds = [[41.68075941231813, 19.375888049080856], [34.60737710561527, 28.543628959853727]];
L.imageOverlay(imageUrl, imageBounds).addTo(open_street_map);`
];