
window.onload = function(){
	onStart();
	var username = Cookie.get("username");
	fillFriends();
	fillFields(username);
	updateProfilePicture(username);
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

var fillFriends = function(){
	var picList = $("#friendspics ul");
	for(var i = 0; i<10; i++){
		var item = document.createElement('li');
		item.innerHTML =  '\n <img alt="greenjm" src="../../resources/images/placeholder.png"> \n'; 
		item.onclick = function() {
			magnifyImage(this,true);
		}
		picList.append(item);
	}
}


var viewProfile =  function(){
	var redirectString = "profile.php?username="+$('#viewer-header h2').html();
	redirect(redirectString);
}
