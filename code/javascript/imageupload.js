$(document).ready(function() {
	onStart();
	
	var username = Cookie.get("username");
	//var username = 'bruggess';
	document.getElementById('username').value = username;
});



function saveImg(image) {
	var username = Cookie.get("username");
	//var username = 'bruggess';

	var packet = {
		"username": username
	}

  var _this = this;
  
  
    var name = prompt("Please enter an image name:", "Cool Pic");
	if(name!=null) {
		$.ajax({
		type: 'POST',
		url: 'http://webdraw.csse.rose-hulman.edu/set_picture_owner.php',
		data: {
			image: image,
			name: name,
			username: username
		},
		success: function (resp) {
			//console.log(resp);

			
			alert(resp);
		}
		});
  }
}
