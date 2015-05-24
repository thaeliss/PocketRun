var playerHealth;
var XP = 0;
var fightMode = 0;

var styleArray = [
	{
		featureType: "all",
		stylers: [
			{ saturation: -80 }
		]
	},{
		featureType: "road.arterial",
		elementType: "geometry",
		stylers: [
			{ hue: "#00ffee" },
			{ saturation: 50 }
		]
	},{
		featureType: "poi.business",
		elementType: "labels",
		stylers: [
			{ visibility: "off" }
		]
	}
];

var fightInitialized = false;



$(document).ready(function(){

  $('body').on({
    'mousewheel': function(e) {
      if (e.target.id == 'el') return;
      e.preventDefault();
      e.stopPropagation();
    }
  })

	$("#a-button").click( function(){
		if($('#notificationinfo').text() == "You are in the proximity of a monster!!") {
			$('#enemyhealth').text(monsters[monsterNumber].health);
			if(monsters[monsterNumber].type == 3){ //potion
				usePotion(monsterNumber);
			}
			else{ //monster
				if(!fightMode) {
					$('#fight-mode').show();
					fightMode = 1;
					$('#actioninfo').text("YOU HAVE ENTERED THE FIGHT! Press A to attack or press B to run.");
					$('#health').text($('#health2').text());
					$('#playername').text($('#playername2').text());
					
					if(monsters[monsterNumber].type == 1){
						$("#monster-img").attr('src', 'img/monster.png');
						$("#monstername").text("Bulbasaur");
					}else {
						$("#monster-img").attr('src', 'img/monster2.png');
						$("#monstername").text("Charizard");
					}

				}else {
					attackMonster(monsterNumber);
				}
			}
		}
	});

	$("#b-button").click( function(){
		$('#fight-mode').hide();
		fightMode = 0;
		$('#health2').text(playerHealth);
		//fightMode = 0;
	});

});

function usePotion(mn) {
		//check if fight is over
		if(playerHealth < 0){
			window.location = "http://occult.se/mobileproject/GAMEOVER.html";
		}
		
		var potion = getRandomDamage();
		//monster (potion) used, remove monster (potion)
		monsters.splice(mn, 1);
		markers[mn].setMap(null);
		markers.splice(mn, 1);
		playerHealth = parseInt($('#health2').text())+potion;
		$('#health2').text(playerHealth);
		$('#notificationinfo').text("That felt good!");
		closeToMonster();
		
}

function attackMonster(mn) {
			var dmg = getRandomDamage();
			monsters[mn].health = monsters[mn].health - dmg;
			$('#fight-mode').animate({backgroundColor: '#0f0'}, 'fast');
			$('#fight-mode').animate({backgroundColor: '#ddd'}, 'fast');
			if(monsters[mn].health < 0){ //monster dead
				if(monsters[mn].type == 2){ //YOU WON!
					window.location = "http://occult.se/mobileproject/VICTORY.html"; 
				}
 				$('#enemyhealth').text(0);
				monsters.splice(mn, 1);
				markers[mn].setMap(null);
				markers.splice(mn, 1);
				
				XP = parseInt($('#points').text())+5;
				$('#points').text(XP);
				$('#actioninfo').text("YOU KILLED IT! Press B to exit to map.");
				$('#notificationinfo').text("You got XP");
				$("#monster-img").src = 'img/ashes.png';
				$('#health2').text(playerHealth);
				fightMode = 0;
				console.log("after monster death");
				//closeToMonster();
			}else{
				$('#enemyhealth').text(monsters[mn].health);	
				$('#actioninfo').text("You attacked with " + dmg);
				$('#a-button').prop('disabled', true);
				setTimeout(function(){
					$('#actioninfo').text("The pokemon attacked you with " + monsters[mn].damage);
					$('#fight-mode').animate({backgroundColor: '#f00'}, 'fast');
					$('#fight-mode').animate({backgroundColor: '#ddd'}, 'fast');
					playerHealth = parseInt($('#health').text())-monsters[mn].damage;
					//check if fight is over
					if(playerHealth < 0){
						window.location = "http://occult.se/mobileproject/GAMEOVER.html";
					}
					$('#health').text(playerHealth);		
					$('#a-button').prop('disabled', false);
				}, 1500);
			}	
}

function getRandomDamage () {
	return Math.round(Math.random()*80 + XP);
}