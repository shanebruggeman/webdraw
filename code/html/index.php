<!DOCTYPE html>
<html>
<head>
	<title>Web Draw</title>
	<link rel="stylesheet" type="text/css" href="../css/main.css">
	<link rel="stylesheet" type="text/css" href="../css/index.css">
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
		<div id="login-container">
			<h2>Please Login</h2>
			<input type="text" name="username" placeholder="username"/>
			<input type="password" name="password" placeholder="password"/>
			<input type="submit" onclick="login()"/>
		</div>
	</div>
	<div style="display:none;" id="blackBackground" onclick="closelogin()"></div>
	<div class="footer"></div>
</body>
</html>