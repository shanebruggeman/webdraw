var USERNAME;
var OWNERSHIP = true;

window.onload = function() {
	onStart();
	USERNAME = Cookie.get("username");
}
var buildPage = function(string) {
	USERNAME = Cookie.get("username");
	if (typeof string != 'undefined' && string != "") {
		USERNAME = string;
		OWNERSHIP = false;
	}
	fillmyPics();
	fillFriendsPics();
	updateProfilePicture(USERNAME);
	fillinfo();
}


var fillinfo = function() {
	var packet = {
		"username": USERNAME
	}
	$.ajax({
		type: "GET",
		url: 'http://webdraw.csse.rose-hulman.edu/user_information.php',
		dataType: "text",
		data: packet,
		success: function(data1) {
			var data = JSON.parse(data1);
			$('#name').html(data["first_name"] + " " + data["last_name"]);
			$('#email').html(data['email']);
			$("#username").html(data["username"]);
			if (!OWNERSHIP) {
				$("#my-title h1").html(data["first_name"] + "'s Pictures");
				$("#friend-title h1").html(data["first_name"] + "'s' Friend's Pictures");
			}
		},
		error: function(request, status, error) {
			console.log("Failed to retrieve a picture");
		}
	});
}

var fillmyPics = function() {
	var packet = {
		"username": USERNAME
	}
	var picList = $("#myPics ul");
	picList.html("");
	$.ajax({
		type: "GET",
		url: 'http://webdraw.csse.rose-hulman.edu/all_user_pictures.php',
		dataType: 'json',
		data: packet,
		success: function(data) {
			for (var id in data) {
				//console.log(data[id]);
				var item = $('<li>\n \n</li>');
				var pic = $(data[id]["image"]);
				pic.attr("alt", data[id]["name"]);
				pic.attr("data", id);
				item.append(pic);
				item.click(function() {
					magnifyImage(this, OWNERSHIP);
					$("#profile").hide();
					$("#unfriend").hide();
				});
				picList.append(item);
			}
		},
		error: function(request, status, error) {
			console.log("Failed to retrieve a picture");
		}
	});
}
var fillFriendsPics = function() {
	var picList = $("#friendsPics ul");
	var userid;
	var packet = {
		"username": USERNAME
	}
	userid = $.ajax({
		url: "http://webdraw.csse.rose-hulman.edu/get_id_from_username.php",
		datatype: "text",
		data: packet,
		async: false
	}).responseText;

	var packet2 = {
		"userid": userid
	}
	var json = $.ajax({
		url: "http://webdraw.csse.rose-hulman.edu/get_all_friends.php",
		dataType: "json",
		data: packet2,
		async: false
	}).responseText;
	json = $.parseJSON(json);
	var array = [];
	for(var id in json){
		array.push(id);
	}
	for(var i = 0; i < array.length; i++){
		var packet3 = {
			"username": array[i]
		}
		$.ajax({
			url: "http://webdraw.csse.rose-hulman.edu/all_user_pictures.php",
			dataType: "json",
			data: packet3,
			success: function(data){
				for (var id in data) {
				//console.log(data[id]);
				var item = $('<li>\n \n</li>');
				var pic = $(data[id]["image"]);
				pic.attr("alt", data[id]["name"]);
				pic.attr("data", id);
				item.append(pic);
				item.click(function() {
					magnifyImage(this, false);
					$("#profile").hide();
					$("#unfriend").hide();
				});
				picList.append(item);
			}
			}
		});
	}
}

var setProfile = function(e) {
	var picID = $("#viewer-picture img").attr("data");
	var packet = {
		"username": USERNAME,
		"pictureid": picID
	}
	$.ajax({
		type: "POST",
		url: "http://webdraw.csse.rose-hulman.edu/set_profile_picture.php",
		data: packet,
		success: function() {
			location.reload();
		}
	});
}