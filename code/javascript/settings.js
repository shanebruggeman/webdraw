
window.onload = function(){
	onStart();
	var username = Cookie.get("username");
	//fillFriends(username);
	fillFields(username);
	updateProfilePicture(username);
	//fillAddFriends(username);

	var userid = getUserID(username);
	fillFriends(userid);
	fillAddFriends(userid);
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
			console.log(data);
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
				//console.log('loop',username);
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
				console.log(item);
				picList.append(item);
			}

		},
		error: function(request, status, error) {
			console.log("Failed to retrieve a picture");
		}

	});
}

	/**
	var picList = $("#addFriends ul");
	for(var i = 0; i<10; i++){
		var item = document.createElement('li');
		item.innerHTML =  '\n <img alt="greenjm" src="../../resources/images/placeholder.png"> \n'; 
		item.onclick = function() {
			$('#addfriend').show();
			$('#unfriend').hide();
			magnifyImage(this,true);
		}
		picList.append(item);
	}**/



var viewProfile =  function(){
	var redirectString = "profile.php?username="+$('#viewer-header h2').html();
	redirect(redirectString);
}
