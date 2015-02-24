<!DOCTYPE html>
<html>
<head>
	<title>Web Draw</title>
	<!--CSS-->
	<link rel="stylesheet" type="text/css" href="../style/main.css">
	<link rel="stylesheet" type="text/css" href="../style/gallery.css">	
	<link rel="stylesheet" type="text/css" href="../style/index.css">
	<!--Libraries-->
	<script src="../libraries/jquery-2.1.3.min.js"></script>
	<script src="http://www.webstepbook.com/Cookie.js" type="text/javascript"></script>
	<!--JS-->
	<script src="../javascript/main.js"></script>
	<script src="../javascript/gallery.js"></script>
	<script src="../javascript/index.js"></script>
	<!--misc-->
	<link href="../../resources/images/paint_full1.gif" type="image/gif" rel="shortcut icon"/>

</head>
<body>
	<div class="wrapper">
		<?php include 'navbar.html'; ?>

		<div class="content">
			<div id="header-bar">
				<div id="title">
					<h1>Public Pictures</h1>
				</div>
				<div id="search">
					<label for="username">Picture Name</label>
					<input type="text" name="username" />
					<button type="submit" value="Search" onclick="search()">Search</button>
				</div>
			</div>
			<div class="gallery">
				<div class="galleryimage"></div>
				<div class="gallery" id="myPics">
					<ul></ul>
				</div>
			</div>
		</div>
		<div class="push"></div>
	</div>
	<div id="viewer-wrapper" style="display:none;">
		<div id="viewer-header">
			<h2>Picture Name</h2>
		</div>
		<div id="viewer-content">
			<div id="viewer-picture"></div>
			<div id="viewer-buttons">
				<button type="submit" value="fork" onclick="fork()">Fork</button>
				<button id="deleteButton" type="submit" value="delete" onclick="delete()">Delete</button>
			</div>
		</div>
	</div>

	<div style="display:none" id="login-wrapper">
		<div id="login-header">
			<h2>Sign In</h2>
		</div>
		<div id="login-form">
			<label for="username">Username</label>
			<br>
			<input type="text" name="username" />
			<br>
			<label for="password">Password</label>
			<br>
			<input type="password" name="password"/>
			<br>
			<p id="loginError">Invalid Username or Password</p>
			<button type="submit" value="Sign in" onclick="login()">Sign in</button>
			<!--<input class="button" type="submit" value="Sign in" onclick="login()"/>
			-->
		</div>
	</div>
	<div style="display:none;" id="blackBackground" onclick="closeblack()"></div>
	<div class="footer"></div>
</body>
</html>