<?php
	$servername = "mobileproject-176964.mysql.binero.se";
	$username = "176964_vu88968";
	$password = "PocketRun";
	$dbname = "176964-mobileproject";
	$name = $_POST['name'];
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 

	$result = mysqli_query($conn, "SELECT points FROM player WHERE name = '$name'");
	if(mysqli_num_rows($result) > 0) {
		
		$result = mysqli_query($conn, "SELECT points,health FROM player WHERE name = '$name'");
		if (!$result) {
			echo 'Could not run query: ' . mysqli_error();
			
		}
		$row = mysqli_fetch_row($result);

		$points = $row[0]; // The players points
		$health = $row[1]; // The players health		
	
	}
	else{
		$sql = "INSERT INTO player (name, points, health)
		VALUES ('$name', '0', '100')";

		if ($conn->query($sql) === TRUE) {
		} else {
			echo "Error: " . $sql . "<br>" . $conn->error;
			echo "<br>" . $name;
		}
	}
	
	$sql = "SELECT longitude, latitude, type FROM encounter";
	$result = mysqli_query($conn, $sql); // This line executes the MySQLi query that you typed above

	$encounterArray = array(); // make a new array to hold all encounter elements

	$index = 0;
	while($row = mysqli_fetch_assoc($result)) // loop to give you the data in an associative array so you can use it however.
	{
		 $encounterArray[$index] = $row;
		 $index++;
	}
	
	$conn->close();
	
?>

 <html>
	<head>
		<title>PocketRun</title>

		<!-- CONFIGURATION -->
		 <!-- Allow web app to be run in full-screen mode. -->
		<meta name="apple-mobile-web-app-capable" content="yes">
		 <!-- Make the app title different than the page title. -->
		<meta name="apple-mobile-web-app-title" content="iOS 8 web app">
		 <!-- Configure the status bar. -->
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		 <!-- Set the viewport. -->
		<meta name="viewport" content="initial-scale=1, user-scalable=no, minimal-ui">
		 <!-- Disable automatic phone number detection. -->
		<meta name="format-detection" content="telephone=no">
		<meta charset="UTF-8">

		<!-- SCRIPT LOAD -->
		<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
		<link href="https://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet">
		<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
		<script src="https://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
		<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>

		<!-- CUSTOM CSS -->
		<link rel="stylesheet" type="text/css" href="style.css">
		<!-- CUSTOM JS -->
		<script src="custom.js"></script>
		<script src="gmap.js"></script>
		<script src="geolocationmarker-compiled.js"></script>
		
		<!-- ICONS -->
		<!-- iPad retina icon -->
		<link href="img/apple-touch-icon-precomposed-152x152.png" sizes="152x152" rel="apple-touch-icon-precomposed">
		<!-- iPad retina icon (iOS < 7) -->
		<link href="img/apple-touch-icon-precomposed-144x144.png" sizes="144x144" rel="apple-touch-icon-precomposed">
		<!-- iPad non-retina icon -->
		<link href="img/apple-touch-icon-precomposed-76x76.png" sizes="76x76" rel="apple-touch-icon-precomposed">
		<!-- iPad non-retina icon (iOS < 7) -->
		<link href="img/apple-touch-icon-precomposed-72x72.png" sizes="72x72" rel="apple-touch-icon-precomposed">
		<!-- iPhone 6 Plus icon -->
		<link href="img/apple-touch-icon-precomposed-180x180.png" sizes="120x120" rel="apple-touch-icon-precomposed">
		<!-- iPhone retina icon (iOS < 7) -->
		<link href="img/apple-touch-icon-precomposed-114x114.png" sizes="114x114" rel="apple-touch-icon-precomposed">
		<!-- iPhone non-retina icon (iOS < 7) -->
		<link href="img/apple-touch-icon-precomposed-57x57.png" sizes="57x57" rel="apple-touch-icon-precomposed">
		<!-- STARTUP IMAGES -->
		<!-- iPad retina portrait startup image -->
		<link href="img/apple-touch-startup-image-1536x2008.png"
				media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" rel="apple-touch-startup-image">
		<!-- iPad retina landscape startup image -->
		<link href="img/apple-touch-startup-image-1496x2048.png"
				media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" rel="apple-touch-startup-image">
	 	<!-- iPad non-retina portrait startup image -->
		<link href="img/apple-touch-startup-image-1536x2008.png"
				media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 1) and (orientation: portrait)" rel="apple-touch-startup-image">
	 	<!-- iPad non-retina landscape startup image -->
		<link href="img/apple-touch-startup-image-1536x2008.png"
				media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 1) and (orientation: landscape)" rel="apple-touch-startup-image">
	 	<!-- iPhone 6 Plus portrait startup image -->
		<link href="img/apple-touch-startup-image-1242x2148.png"
				media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" rel="apple-touch-startup-image">
	 	<!-- iPhone 6 Plus landscape startup image -->
		<link href="img/apple-touch-startup-image-1182x2208.png"
				media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" rel="apple-touch-startup-image">
	 	<!-- iPhone 6 startup image -->
		<link href="img/apple-touch-startup-image-750x1294.png"
				media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
	 	<!-- iPhone 5 startup image -->
		<link href="img/apple-touch-startup-image-640x1096.png"
				media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
	 	<!-- iPhone < 5 retina startup image -->
		<link href="img/apple-touch-startup-image-640x920.png"
				media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
	 	<!-- iPhone < 5 non-retina startup image -->
		<link href="img/apple-touch-startup-image-640x920.png"
				media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 1)" rel="apple-touch-startup-image">
	</head>
	<body id="body">

		<div class="" id="map-canvas"></div>
		<div class="panel panel-danger" id="fight-mode">
			<div class="panel-heading" id="actioninfo"></div>
			<div class="panel-body">
				<div class="row">
					<div class="col-xs-6" id="player-img"></div><div class="col-xs-6 pull-right"> <img id="monster-img"/></div>
				</div> 
				<div class="row">
					<div class="col-xs-6" id="playername"></div><div class="col-xs-6 pull-right" id="monstername"></div>
				</div> 
				<div class="row">
					<div class="col-xs-6"><span id="health"></span> hp
					</div><div class="col-xs-6 pull-right"> <span id="enemyhealth"></span> hp</div>
				</div>	
			</div>
		</div>
		<div class="row" id="logo">
			<div class="col-xs-2"></div>
			<div class="col-xs-8 center-x"><img src="img/logo.png" id="logo"/></div>
			<div class="col-xs-2"></div>
		</div>
		<div class="row" id="buttons">
			<div class="col-xs-10"></div>
			<div class="col-xs-2">
				<div id="ab-buttons">
					<input type="button" class="btn btn-xlg btn-primary" id="a-button" value="A"></input> 
					<br/><br/>
					<input type="button" class="btn btn-xlg btn-info" id="b-button" value="B"></input> 
				</div>
			</div>
		</div>

		<div class="well well-sm" id="textbox1">
			Name: <span id="playername2"><?php echo $name?></span> 
			~ XP: <span id="points">0</span> 
			~ HP: <span id="health2">100</span>
			<span id="enemy">
				<span id="enemyhealth2"></span>
			</span>
			<span id="notification">
				Note: <span id="notificationinfo"></span>
			</span> 
		</div>
	</body>
	
	<script>

	</script>
</html>