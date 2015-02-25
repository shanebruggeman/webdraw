window.onload = function() {
	onStart();
	var username = Cookie.get("username");
	//FIll most recent 10
	fillmyPics(username);
	fillFriendsPics(username);
	updateProfilePicture(username);
	fillinfo(username);

}



var fillinfo = function(username) {
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
			$('#name').html(data["first_name"] + " " + data["last_name"]);
			$('#email').html(data['email']);
			//console.log(data,JSON.stringify(data));
		},
		error: function(request, status, error) {
			console.log("Failed to retrieve a picture");
		}
	});
}

var fillmyPics = function(username) {
	var packet = {
		"username": username
	}
	var picList = $("#myPics ul");
	$.ajax({
		type: "GET",
		url: 'http://webdraw.csse.rose-hulman.edu/all_user_pictures.php',
		dataType: 'json',
		data: packet,
		success: function(data) {
			//console.log(data);
			for (var name in data) {
				//console.log(name);
				for (var i = 0; i < data[name].length; i++) {
					//console.log(data[name],name.length,i);
					var item = $('<li>\n \n</li>');
					var pic = $(data[name][i]);
					pic.attr("alt", name);
					item.append(pic);
					//item.onclick = function() {
					//	magnifyImage(this, true);
					//}
					item.click(function() {
						magnifyImage(this, true);
					});
					//item.appendTo(picLi)
					picList.append(item);
				}
			}
		},
		error: function(request, status, error) {
			console.log("Failed to retrieve a picture");
		}
	});
}
var fillFriendsPics = function(username) {
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