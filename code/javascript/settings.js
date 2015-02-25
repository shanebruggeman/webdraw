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
			$("#firstName").attr("value",data["first_name"]);
			$("#lastName").attr("value",data["last_name"]);
			$("#emailInput").attr("value",data['email']);
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

	console.log(e.getAttribute('userid'));
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

	console.log(e.getAttribute('userid'));
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

	console.log(e.getAttribute('userid'));
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
	console.log(packet);
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