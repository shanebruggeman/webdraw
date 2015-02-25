var USERID;
window.onload = function(){
	onStart();
	var username = Cookie.get("username");
	fillFields(username);
	updateProfilePicture(username);
	
	USERID = getUserID(username);
	fillFriends(USERID);
	fillAddFriends(USERID);
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
	/**Doesn't Appear To Return Data?---ON HOLD**/
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
	/**Doesn't Appear To Return Data?---ON HOLD**/
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