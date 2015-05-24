var map;
var cpLati;
var cpLongi;
var homePlace;
var monsterNumber;
var monsters = [];
var markers = [];

// 	INITIALIZE --------------------------------------------------------------------------------
function initialize() {

//	getLocation();
	
	var myLatlng = new google.maps.LatLng(59.327543, 18.055582);
	var marker2Latlng = new google.maps.LatLng(59.327943, 18.056182);


	var styledMap = new google.maps.StyledMapType(styleArray,
		{name: "Styled Map"});


	var mapOptions = {
		zoom: 18,
		maxZoom:18,
		minZoom:18,
		disableDoubleClickZoom: true,
		disableDefaultUI: true,
		draggable: false, 
		zoomControl: false, 
		scrollwheel: false, 
		disableDoubleClickZoom: true,
		center: homePlace,

		// CONTROLS
		mapTypeControl: false,
		mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
		},
		panControl: false,
		zoomControl: false,
		scaleControl: false,
		streetViewControl: false,
		
		// MAP TYPE
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	// DRAW MAP
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	
	//Associate the styled map with the MapTypeId and set it to display.
	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');

	
	
	// GET MY POSITION
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			myPosLat = position.coords.latitude;
			myPosLong = position.coords.longitude;
			myLatlng = new google.maps.LatLng(myPosLat, myPosLong);
			newLocation(myLatlng);
			createMonster();
		}, function() {
			handleNoGeolocation(true);
		});
	} else {
		alert('Your browser does not support geolocation');
		handleNoGeolocation(false); // Browser doesn't support Geolocation
	}

	
	getLocation();
	
	//Gamer marker
	GeoMarker = new GeolocationMarker(map);
	GeoMarker.setCircleOptions({fillColor: '#808080'});
	
	
	// GEOMARKER CODE - används inte, men kan centrera kartan dynamiskt
/*	google.maps.event.addListener(GeoMarker, 'position_changed', function() {
		map.setCenter(this.getPosition());
		map.fitBounds(this.getBounds());
		
		newLocation(this.getPosition());
	});	
	google.maps.event.addListener(GeoMarker, 'geolocation_error', function(e) {
		alert('There was an error obtaining your position. Message: ' + e.message);
	});
	GeoMarker.setMap(map);*/
	
	
	function createMonster(){
		//MONSTERS
		var longi = myPosLong;
		var lati = myPosLat;
		var img = "img/monster.png";
		var pimage = "img/potion.png";
		for(i = 0; i < 50; i++){
			newlongi = longi + ((Math.random()*2) -1) * 0.003;
			newlati = lati + ((Math.random()*2) -1) * 0.003;
			if(i == 0){ //CHARIZARD
				img = "img/monster2.png";
				var monster = {"type":2, "health":500, "lati":lati, "longi":longi, "damage":30};
				var monsterLoc = new google.maps.LatLng(monster.lati, monster.longi);
				monsters.push(monster);
				
				
				var marker = new google.maps.Marker({
				  position: monsterLoc,
				  map: map,
				  title: 'CHARIZARD',
				  icon: img
				});
				markers.push(marker);
				img = "img/monster.png";
			}
			else if(i < 30){ //bulbasaur
				monster = {"type":1, "health":100, "lati":newlati, "longi":newlongi, "damage":10};
				monsterLoc = new google.maps.LatLng(monster.lati, monster.longi);
				monsters.push(monster);
				
				//MONSTERMARKERS
				var marker = new google.maps.Marker({
				  position: monsterLoc,
				  map: map,
				  title: 'Bulbasaur',
				  icon: img
				});
				markers.push(marker);
			}
			
			else{ //potion
				monster = {"type":3, "health":100, "lati":newlati, "longi":newlongi};
				monsterLoc = new google.maps.LatLng(monster.lati, monster.longi);
				monsters.push(monster);
				
				//MONSTERMARKERS
				var marker = new google.maps.Marker({
				  position: monsterLoc,
				  map: map,
				  title: 'Potion',
				  icon: pimage
				});
				markers.push(marker);
			}
		}
	}
	
	

	// SET CENTER OF MAP --------------
	function newLocation(pos) {
		map.setCenter({
			lat : pos['A'],
			lng : pos['F']
		});
	}

	function handleNoGeolocation(errorFlag) {
		if (errorFlag) {
			var content = 'Error: The Geolocation service failed.\nYou must enable it before you can play this game.';
		} else {
			var content = 'Error: Your browser doesn\'t support geolocation.\nYou must switch to another device before you can play this game.';
		}
		var options = {
			map: map,
			position: new google.maps.LatLng(60, 105),
			content: content
		};
		var infowindow = new google.maps.InfoWindow(options);
		map.setCenter(options.position);
	}
	
	//HÄMTAR DIN NUVARANDE POSITION OCH BEVAKAR DEN, SOM EN EVENTLISTENER
	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.watchPosition(success,error);		//setPosition = callback function with a Position object as its only input parameter	        
		} else { 
			 console.log("Error with Geolocation!");
		}
	}
	//NÄR DU FLYTTAR PÅ DIG FLYTTAR DEN PÅ KARTAN
	//***** SKRIV KODEN HÄR!!!! ******
	function success(position) {
		cpLati = position.coords.latitude;
		cpLongi = position.coords.longitude;
		var newLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		map.setCenter(newLatlng);
		
		//Check if close to monster :O
		closeToMonster();
		
		//Nånting i stil med kollar din position och monstrets position och gör saker när ni är på samma ställe.
		//if (target.latitude === postition.latitude && target.longitude === postition.longitude) {
	}		
	function error(PositionError){
		console.log('fuckkk');
	}		
		
} google.maps.event.addDomListener(window, 'load', initialize);

function closeToMonster(){
	//Check if close to monster :O
		for(i = 0; i < monsters.length; i++){

			if(monsters[i].longi > (cpLongi - 0.0003) && monsters[i].longi < (cpLongi + 0.0003)){
				if(monsters[i].lati > (cpLati - 0.0003) && monsters[i].lati < (cpLati + 0.0003)){
					$('#notificationinfo').text("You are in the proximity of a monster!!");
					monsterNumber = i;
					logga(i);
					console.log("notificatooninfo")
					//console.log($('#notificationinfo').text());
					return;
				}
			}
			else{
				$('#notificationinfo').text("nothing to see here");
			}
		}

}

// DEBUG
function logga (variable) {
	console.log(variable);
}
