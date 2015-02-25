<!DOCTYPE html>
<html>
<head>
	<title>User Profile</title>
	<!--CSS-->
	<link rel="stylesheet" type="text/css" href="../style/main.css">
	<link rel="stylesheet" type="text/css" href="../style/settings.css">
	<!--Libraries-->
	<script src="../libraries/jquery-2.1.3.min.js"></script>
	<script src="https://code.createjs.com/preloadjs-0.6.0.min.js"></script>
	<script src="http://www.webstepbook.com/Cookie.js" type="text/javascript"></script>
	<!--JS-->
	<script src="../javascript/main.js"></script>
	<script src="../javascript/settings.js"></script>

</head>
<body>
	<div class="wrapper">
		<?php include 'navbar.html' ?>

		<div class="profile">
			<img src="../../resources/images/placeholder.png" id="profilepic">
			<div class="right">
				<h1 id="username">Username</h1>
				<div class="name">
					<input class="nameInput" id="firstName" type="text" name="firstName" >
					<input class="nameInput" id="lastName" type="text" name="lastName"></div>
				<br>
				<input id="emailInput" type="text" name="email">
				<br>
				<button id="saveProfile"type="submit" value="profile" onclick="saveProfile()">Save</button>
			</div>
			<div class="myfriends">
				<div class="scroll-header" id="friends-header">
					<div class="title">
						<h1>Friends</h1>
					</div>
				</div>
				<div class ="gallery" id="friendspics">
					<ul></ul>
				</div>
			</div>
			<div style="display:none;" id="friendRequests"><!---->
				<div class="scroll-header" id="requests-header">
					<div class="title">
						<h1>Friend Requests</h1>
					</div>
				</div>
				<div class ="gallery" id="requestPics">
					<ul></ul>
				</div>
			</div>			
			<div class="addFriends">
				<div class="scroll-header" id="friends-header">
					<div class="title">
						<h1>Add Friends</h1>
					</div>
					<div class="search">
						<div class="add">
							<label for="username">Find Friends</label>
							<br>
						</div>
						<input id="searchbox" type="text" name="username" />
						<button id="searchinput"type="submit" value="Search" onclick="search()">Search</button>
					</div>
				</div>
				<div class ="gallery" id="addFriends">
					<ul></ul>
				</div>
			</div>
		</div>

		<div id="viewer-wrapper" style="display:none;">
			<div id="viewer-header">
				<h2>Picture Name</h2>
			</div>
			<div id="viewer-content">
				<div id="viewer-picture"></div>
				<div id="viewer-buttons">
					<button type="submit" value="viewProfile" onclick="viewProfile()">View Profile</button>
					<button id="unfriend" type="submit" value="unfriend" onclick="unfriend(this)">Unfriend</button>
					<button id="addfriend" type="submit" value="addfriend" onclick="addFriend(this)">Add Friend</button>
					<button id="acceptFriend" type="submit" value="acceptFriend" onclick="acceptFriend(this)">Accept Request</button>
					<button id="rejectFriend" type="submit" value="rejectFriend" onclick="rejectFriend(this)">Reject Request</button>
				</div>
			</div>
		</div>
		<div style="display:none;" id="blackBackground" onclick="closeViewer()"></div>
	</div>
</body>
</html>