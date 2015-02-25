var USERNAME;
var OWNERSHIP = true;

window.onload = function() {
	onStart();
	USERNAME = Cookie.get("username");
}
var buildPage = function(string){
	USERNAME = Cookie.get("username");
	if(typeof string != 'undefined' && string!=""){
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
			if(!OWNERSHIP){
				$("#my-title h1").html(data["first_name"]+"'s Pictures");
				$("#friend-title h1").html(data["first_name"]+"'s' Friend's Pictures");
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
			for(var id in data){
				//console.log(data[id]);
				var item = $('<li>\n \n</li>');
				var pic = $(data[id]["image"]);
				pic.attr("alt", data[id]["name"]);
				pic.attr("data", id);
				item.append(pic);
				item.click(function() {
						magnifyImage(this, OWNERSHIP);
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
	for (var i = 0; i < 10; i++) {
		var item = document.createElement('li');
		item.innerHTML = '\n <img alt ="friend" src="../../resources/images/placeholder.png"> \n';
		item.onclick = function() {
			magnifyImage(this, false);
		}
		picList.append(item);
	}
}

var setProfile = function(e){
	var picID = $("#viewer-picture img").attr("data");
	var packet = {
		"username": USERNAME,
		"pictureid": picID
	}
	$.ajax({
		type: "POST",
		url: "http://webdraw.csse.rose-hulman.edu/set_profile_picture.php",
		data: packet,
		success: function(){
			location.reload();
		}
	});
}