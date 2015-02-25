var USERNAME;
var OWNERSHIP = true;

window.onload = function() {
	onStart();
	USERNAME = Cookie.get("username");
}
var buildPage = function(string){
	console.log("build");
	USERNAME = Cookie.get("username");
	if(typeof string != 'undefined' && string!=""){
		console.log("hit"+string+"..");
		USERNAME = string;
		OWNERSHIP = false;
	}
	console.log("build",username);
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
			for (var name in data) {
				for (var i = 0; i < data[name].length; i++) {
					var item = $('<li>\n \n</li>');
					var pic = $(data[name][i]);
					pic.attr("alt", name);
					item.append(pic);
					item.click(function() {
						magnifyImage(this, OWNERSHIP);
					});
					picList.append(item);
				}
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