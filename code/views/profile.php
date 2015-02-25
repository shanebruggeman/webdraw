<!DOCTYPE html>
<html>
<head>
	<title>User Profile</title>
	<!--CSS-->
	<link rel="stylesheet" type="text/css" href="../style/main.css">
	<link rel="stylesheet" type="text/css" href="../style/profile.css">
	<!--Libraries-->
	<script src="../libraries/jquery-2.1.3.min.js"></script>
	<script src="https://code.createjs.com/preloadjs-0.6.0.min.js"></script>
	<script src="http://www.webstepbook.com/Cookie.js" type="text/javascript"></script>
	<!--JS-->
	<script src="../javascript/main.js"></script>
	<script src="../javascript/profile.js"></script>

</head>
<body>
	<div class="wrapper">
		<?php include 'navbar.html' ?>

		<div class="profile">
			<img src="../../resources/images/placeholder.png" id="profilepic">
			<div class="right">
				<h1 id="username"></h1>
				<h2 id="name"></h2>
				<h3 id="email"></h3>
			</div>
			<div id="myPicsHeader">
				<div id="my-title">
					<h1>My Pictures</h1>
				</div>
			</div>
			<div class="gallery" id="myPics">
				<ul></ul>
			</div>
			<div id="friendsPicHeader">
				<div id="friend-title">
					<h1>My Friend's Pictures</h1>
				</div>
			</div>
			<div class="gallery" id="friendsPics">
				<ul></ul>
			</div>
		</div>
		<div id="viewer-wrapper" style="display:none;">
			<div id="viewer-header">
				<h2>Picture Name</h2>
			</div>
			<div id="viewer-content">
				<div id="viewer-picture"></div>
				<div id="viewer-buttons">
					<button id="forkbutton" type="submit" value="fork" onclick="forkpic(this)">Fork</button>
					<button id="deleteButton" type="submit" value="delete" onclick="deletepic(this)">Delete</button>
				</div>
			</div>
		</div>
		<div style="display:none;" id="blackBackground" onclick="closeViewer()"></div>
	</div>
</body>
</html>