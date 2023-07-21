// Στα πλαίσια της πτυχιακής εργασίας:
// Διεπαφες Χαρτη στις Web Εφαρμογές
// του Ευάγγελου Παραλή
// Τμηματος Μηχανικών Πληροφορικής Τ.Ε. Λάρισας 

function load_iframe(url){
    document.getElementById("maps-content").src = url;
}

function populate_elements(feature, google_snippet_id = null, osm_snippet_id = null, index = null){
    // google maps
	init_google_map(feature);

    //open street map
	init_open_street_map(feature);

	//code snippets
	if(index != null && google_snippet_id != null && osm_snippet_id != null){
		document.getElementById(osm_snippet_id).innerHTML = os_maps_code_snippets[index];
		hljs.highlightElement(document.getElementById(google_snippet_id));
		hljs.lineNumbersBlock(document.getElementById(google_snippet_id));

		document.getElementById(google_snippet_id).innerHTML = google_maps_code_snippets[index];
		hljs.highlightElement(document.getElementById(osm_snippet_id));
		hljs.lineNumbersBlock(document.getElementById(osm_snippet_id));
	}
}

function copy_to_clipboard(map, index){
	switch(map){
		case 'google':
			navigator.clipboard.writeText(google_maps_code_snippets[index]);

			var x = document.getElementById("snackbar");
			x.className = "show";
			setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
			break;
		case 'osm':
			navigator.clipboard.writeText(os_maps_code_snippets[index]);

			var x = document.getElementById("snackbar");
			x.className = "show";
			setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
			break;
	}
}