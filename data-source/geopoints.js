// Στα πλαίσια της πτυχιακής εργασίας:
// Διεπαφες Χαρτη στις Web Εφαρμογές
// του Ευάγγελου Παραλή
// Τμηματος Μηχανικών Πληροφορικής Τ.Ε. Λάρισας 

const geopoints = [
    {
        Title : "Γήπεδο Τούμπας",
        Description: "Το Γήπεδο της Τούμπας (επίσημη ονομασία: Στάδιο ΠΑΟΚ) αποτελεί την έδρα της ποδοσφαιρικής ομάδας του ΠΑΟΚ. Συχνά αναφέρεται απλά ως Τούμπα, προσδιορίζοντας την ομώνυμη συνοικία (Δήμος Θεσσαλονίκης, 4ο Δημοτικό Διαμέρισμα) στην οποία και βρίσκεται. Είναι ιδιοκτησία της ποδοσφαιρικής ομάδας ΠΑΟΚ.",
        Latitude :40.61291551292003,  
        Longitude : 22.972182669299624,
        Capacity : 29000
    },
    {
        Title : "Ολυμπιακό Στάδιο «Σπύρος Λούης»",
        Description: "Το Ολυμπιακό Στάδιο Αθηνών (επίσημη ονομασία: Κεντρικό Ολυμπιακό Στάδιο)[2] βρίσκεται στο Μαρούσι, περίπου εννιά χιλιόμετρα από το κέντρο της Αθήνας. Είναι το μεγαλύτερο σε χωρητικότητα στάδιο της Ελλάδας και αποτελεί τμήμα του Ολυμπιακού Αθλητικού Κέντρου Αθηνών «Σπύρος Λούης» (Ο.Α.Κ.Α.). Σκοπός του ήταν εξ αρχής να δώσει τη δυνατότητα ανάληψης μεγάλων διοργανώσεων από την Ελλάδα. Φιλοξενεί τους αγώνες της ομάδας της ΑΕΚ και της Εθνικής Ελλάδας και στο παρελθόν του Παναθηναϊκού.",
        Latitude : 38.03631715564138,
        Longitude : 23.787502853343906,
        Capacity : 69618
    },
    {
        Title : "Γήπεδο Γεώργιος Καραϊσκάκης",
        Description: "Το Στάδιο «Γεώργιος Καραϊσκάκης» είναι σύγχρονο ελληνικό στάδιο ποδοσφαίρου στο Νέο Φάληρο στον Πειραιά. Φέρει το ονοματεπώνυμο του γνωστού αρχιστρατήγου (1782-1827) της Επανάστασης του 1821, σε ανάμνηση του θανάτου του μετά από μάχη σε παραπλήσια τοποθεσία. Επί της ουσίας, στην αθλητική βιβλιογραφία απαντούν με την ίδια ονομασία και οι τρεις αθλητικοί χώροι που σε βάθος χρόνου κατασκευάστηκαν στο ίδιο ακριβώς σημείο ( το 1895 ως Ποδηλατοδρόμιο, το 1964 ως Στάδιο Καραϊσκάκη και το 2004 νέο στάδιο)[5], με τον πιο πρόσφατο να αναφέρεται για αντιδιαστολή ως νέο Στάδιο Καραϊσκάκη.",
        Latitude : 37.946729309659105, 
        Longitude : 23.664388869245307,
        Capacity : 32115
    },
    {
        Title : "AEL F.C. Arena",
        Description: "Το AEL FC Arena είναι ένα γήπεδο ποδοσφαίρου που βρίσκεται στην περιοχή Νεάπολη της Λάρισας .Μέχρι το 2020 αποτελούσε την έδρα της Α.Ε. Λάρισας (ΑΕΛ) η οποία επέστρεψε στην παλιότερη έδρα της, το Στάδιο Αλκαζάρ.",
        Latitude : 39.61555028212537,
        Longitude : 22.399326267431587,
        Capacity : 16118
    },
    {
        Title : "Παμπελοποννησιακό Στάδιο",
        Description: "ο Παμπελοπονησιακό Στάδιο είναι αθλητική εγκατάσταση και αποτελεί μέρος του σύγχρονου Παμπελοποννησιακού Εθνικού Αθλητικού Κέντρου (Π.Ε.Α.Κ.), ευρισκόμενο στην Πάτρα και συγκεκριμένα στην συνοικία Κουκούλι, νοτιοανατολικά του κέντρου της πόλης.",
        Latitude : 38.22100726869698,
        Longitude : 21.75066174226294,
        Capacity : 23588
    },
    {
        Title : "Παγκρήτιο Στάδιο",
        Description: "Το Παγκρήτιο Στάδιο είναι στάδιο που κατασκευάστηκε για τις ανάγκες των Ολυμπιακών Αγώνων του 2004. Βρίσκεται στο Ηράκλειο Κρήτης στη δυτική πλευρά της πόλης, 50 μέτρα από την ακτή. Είναι χωρητικότητας περίπου 26.000 θεατών και αποτελεί ένα από τα πλέον σύγχρονα στη χώρα. Η κατασκευή του ολοκληρώθηκε το Μάρτιο του 2004.",
        Latitude : 35.336910750212155,
        Longitude : 25.10609399618397,
        Capacity : 26240
    },
];