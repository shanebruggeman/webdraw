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
					<label for="picname">Picture Name</label>
					<input type="text" name="name" />
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
		</div>
	</div>

	<div style="display:none" id="login-wrapper">
		<div id="login-header">
			<h2>Sign In</h2>
		</div>
		<div id="login-form">
			<label for="username">Username</label>
			<br>
			<input type="text" name="username" autofocus />
			<br>
			<label for="password">Password</label>
			<br>
			<input type="password" name="password" autofocus/>
			<br>
			<p id="loginError" style="display:hidden;">Invalid Username or Password</p>
			<p id="success"  style="display:hidden;">You have been registered</p>
			<button type="submit" value="Sign in" onclick="login()">Sign In</button>
			<!--<input class="button" type="submit" value="Sign in" onclick="login()"/>
			-->
			<button id="register" type="submit" value="Register" onclick="openregister()">Register</button>
		</div>
	</div>
	<div style="display:none" id="register-wrapper">
		<div id="register-header">
			<h2>Register</h2>
		</div>
		<div id="register-form">
			<label for="first-name" >First Name</label>
			<br>
			<input type="text" name="first-name" autofocus/>
			<br>
			<label for="last-name">Last Name</label>
			<br>
			<input type="text" name="last-name" autofocus/>
			<br>
			<label for="user">Username</label>
			<br>
			<input type="text" name="user" autofocus/>
			<br>
			<label for="pass">Password</label>
			<br>
			<input type="password" name="pass" autofocus/>
			<br>
			<label for="confirm">Confirm Password</label>
			<br>
			<input type="password" name="confirm" autofocus/>
			<br>
			<label for="email">E-mail</label>
			<br>
			<input type="email" name="email" autofocus/>
			<br>
			<p id="passwordError">Your passwords do not match</p>
			<p id="usernameTaken">That username is already in use</p>
			<!--<p id="success">You have been registered</p>-->
			<button id="sign-up" type="submit" value="Sign Up" onclick="register()">Sign Up</button>
		</div>
	</div>

	<div style="display:none;" id="blackBackground" onclick="closeblack()"></div>
	<div class="footer"></div>
</body>
</html>