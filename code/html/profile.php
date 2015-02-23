<!DOCTYPE html>
<html>
<head>
	<title>User Profile</title>
	<link rel="stylesheet" type="text/css" href="../css/main.css">
	<link rel="stylesheet" type="text/css" href="../css/profile.css">
	<script src="../javascript/profile.js"></script>
	<script src="../javascript/index.js"></script>
	<script src="http://www.webstepbook.com/Cookie.js" type="text/javascript"></script>
</head>
<body>
	<div class="wrapper">
		<?php include 'navbar.html' ?>

		<div id="content">
			<div id="slim-content">
				<div id="person-head">
					<div class="profile_picture_wrapper">
						<img class="profile_picture"></div>
					<div class="user_account">
						<h1 class="username"></h1>
					</div>
				</div>
				<div id="person-body"></div>
			</div>
		</div>
	</div>

</body>
</html>