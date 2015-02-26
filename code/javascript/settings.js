var USERID;
window.onload = function(){
	onStart();
	var username = Cookie.get("username");
	fillFields(username);
	updateProfilePicture(username);
	
	USERID = getUserID(username);
	fillFriends(USERID);
	fillAddFriends(USERID);
	fillFriendRequests(USERID);
	setInterval(function(){
		fillFriends(USERID);
		fillFriendRequests(USERID);
	},20000);
}

var fillFields = function(username){	
	$('#username').html(username);
	var packet = {
		"username": username
	}
	$.ajax({
		type: "GET",
		url: 'http://webdraw.csse.rose-hulman.edu/user_information.php',
		dataType: "text",
		data: packet,
		success: function(data1) {			
			var data = JSON.parse(data1);
			$("#firstName").html(data["first_name"]);
			$("#lastName").html(data["last_name"]);
			$("#email").html(data['email']);
		},
		error: function(request, status, error) {
			console.log("Failed to retrieve a picture");
		}
	});
}

var fillFriends = function(userid) {
	var packet = {
		"userid": userid
	}
	var picList = $("#friendspics ul");
	picList.html("");
	$.ajax({
		type: 'GET',
		url: 'http://webdraw.csse.rose-hulman.edu/get_all_friends.php',
		dataType: 'json',
		data: packet,
		success: function(data) {
			for (var username in data) {
				var item = $('<li>\n \n</li>');
				var pic = $(data[username]["image"]);
				pic.attr("alt", username);
				pic.attr("data", data[username]["id"]);
				item.append(pic);
				item.click(function() {
					$('#addfriend').hide();
					$('#unfriend').show();
					$('#acceptFriend').hide();
					$('#rejectFriend').hide();					
					magnifyImage(this, true);
				});
				picList.append(item);
			}

		},
		error: function(request, status, error) {
			console.log("Failed to retrieve a picture");
		}

	});
}


var fillAddFriends = function(userid) {
	var packet = {
		"userid": userid
	}
	var picList = $("#addFriends ul");
	picList.html("");
	$.ajax({
		type: 'GET',
		url: 'http://webdraw.csse.rose-hulman.edu/find_friends.php',
		dataType: 'json',
		data: packet,
		success: function(data) {
			for (var username in data) {
				var item = $('<li>\n \n</li>');
				var pic = $(data[username]["image"]);
				pic.attr("alt", username);
				pic.attr("data", data[username]["id"]);
				item.append(pic);
				item.click(function() {
					$('#addfriend').show();
					$('#unfriend').hide();
					$('#acceptFriend').hide();
					$('#rejectFriend').hide();
					magnifyImage(this, true);
				});
				picList.append(item);
			}

		},
		error: function(request, status, error) {
			console.log("Failed to retrieve a picture");
		}

	});
}

var search = function() {
	$("#addFriends ul").html("");
	var userSearch = document.getElementById('searchbox').value;
	var packet = {
		"username": userSearch,
		"userid": USERID
	}
	var picList = $("#addFriends ul");
	picList.html("");
	$.ajax({
		type: 'GET',
		url: 'http://webdraw.csse.rose-hulman.edu/search_friends_by_username.php',
		dataType: 'json',
		data: packet,
		success: function(data) {
			for (var username in data) {
				var item = $('<li>\n \n</li>');
				var pic = $(data[username]["image"]);
				pic.attr("alt", username);
				pic.attr("data", data[username]["id"]);
				item.append(pic);
				item.click(function() {
					$('#addfriend').show();
					$('#unfriend').hide();
					$('#acceptFriend').hide();
					$('#rejectFriend').hide();
					magnifyImage(this, true);
				});
				picList.append(item);
			}

		},
		error: function(request, status, error) {
			console.log("Failed to retrieve a picture");
		}

	});
}

var fillFriendRequests = function(userid){
	var packet = {
		"userid": userid
	}
	var picList = $("#requestPics ul");
	picList.html("");
	$.ajax({
		type: 'GET',
		url: 'http://webdraw.csse.rose-hulman.edu/get_friend_requests_received.php',
		dataType: 'json',
		data: packet,
		success: function(data) {
			for (var username in data) {
				var item = $('<li>\n \n</li>');
				var pic = $(data[username]["image"]);
				pic.attr("alt", username);
				pic.attr("data", data[username]["id"]);
				item.append(pic);
				item.click(function() {
					$('#addfriend').hide();
					$('#unfriend').hide();
					$('#acceptFriend').show();
					$('#rejectFriend').show();					
					magnifyImage(this, true);
				});
				picList.append(item);
			}
			if(jQuery.isEmptyObject(data)){
				$("#friendRequests").hide();
			}
			else{
				$("#friendRequests").show();
			}

		},
		error: function(request, status, error) {
			console.log("Failed to retrieve a picture");
		}
	});	

}

var viewProfile =  function(){
	var redirectString = "profile.php?username="+$('#viewer-header h2').html();
	redirect(redirectString);
}


var unfriend = function(e){
	var packet = {
		"userid": USERID,
		"friendid": e.getAttribute('userid')
	}

	$.ajax({
		type: "POST",
		url: 'http://webdraw.csse.rose-hulman.edu/unfriend.php',
		data: packet,
		success: function() {
			fillFriends(USERID);
			fillAddFriends(USERID);
			closeViewer();
		}
	});
}

var addFriend = function(e){

	var packet = {
		"requesterid": USERID,
		"requesteeid": e.getAttribute('userid')
	}

	$.ajax({
		type: "POST",
		url: 'http://webdraw.csse.rose-hulman.edu/add_friend_request.php',
		data: packet,
		success: function() {
			fillFriends(USERID);
			fillAddFriends(USERID);
			closeViewer();
		}
	});
}

var acceptFriend = function(e){
	var packet = {
		"requesteeid": USERID,
		"requesterid": e.getAttribute('userid')
	}

	$.ajax({
		type: "POST",
		dataType: false,
		url: 'http://webdraw.csse.rose-hulman.edu/accept_friend_request.php',
		data: packet,
		success: function() {
			fillFriends(USERID);
			fillFriendRequests(USERID);
			closeViewer();
		}
	});
}

var rejectFriend = function(e){
	var packet = {
		"requesteeid": USERID,
		"requesterid": e.getAttribute('userid')
	}
	$.ajax({
		type: "POST",
		dataType: false,
		url: 'http://webdraw.csse.rose-hulman.edu/decline_friend_request.php',
		data: packet,
		success: function() {
			fillFriends(USERID);
			fillFriendRequests(USERID);
			closeViewer();
		}
	});
}

var editProfile = function(){
	$("#blackBackground").show();
	$("#edit-wrapper").show();
}

var updateProfile = function() {
	var packet = {};
	packet["userid"] = USERID;
	console.log($("#first-name").val());
	if ($.trim($("#first-name").val()).length != 0){
		packet["firstname"] = $("#first-name").val();
	}
	if ($.trim($("#last-name").val()).length != 0){
		packet["lastname"] = $("#last-name").val();
	}
	if ($.trim($("#pass").val()).length != 0){
		packet["password"] = $("#pass").val();
	}
	if ($.trim($("#emailInput").val()).length != 0){
		packet["email"] = $("#emailInput").val();
	}
	$.ajax({
		type: "POST",
		url: 'http://webdraw.csse.rose-hulman.edu/update_user.php',
		data: packet,
		success: function() {
			location.reload();
		}
	})
}