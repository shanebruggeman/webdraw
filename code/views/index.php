<!DOCTYPE html>
<html>
<head>
	<title>Web Draw</title>
	<link rel="stylesheet" type="text/css" href="../style/main.css">
	<link rel="stylesheet" type="text/css" href="../style/index.css">
	<script src="../libraries/jquery-2.1.3.min.js"></script>
	<script src="../javascript/index.js"></script>
	<link href="../../resources/images/paint_full1.gif" type="image/gif" rel="shortcut icon"/>
	<script src="http://www.webstepbook.com/Cookie.js" type="text/javascript"></script>
</head>
<body>
	<div class="wrapper">
		<?php include 'navbar.html'; ?>

		<!--New Shit goes here-->
		<div class="push"></div>
	</div>
	<div style="display:none" id="login-wrapper">
		<div id="login-header">
			<h2>Sign In</h2>
		</div>
		<div id="login-form">
			<label for="username">Username</label><br>
			<input type="text" name="username" /><br>
			<label for="password">Password</label><br>
			<input type="password" name="password"/><br>
			<p id="loginError">Invalid Username or Password</p>
			<button type="submit" value="Sign in" onclick="login()">Sign in</button>
			<!--<input class="button" type="submit" value="Sign in" onclick="login()"/>-->
		</div>
	</div>
	<div style="display:none;" id="blackBackground" onclick="closelogin()"></div>
	<div class="footer"></div>
</body>
</html>