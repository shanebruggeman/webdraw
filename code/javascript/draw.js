$(document).ready(function() {
	onStart();
	//get fork image if exists
	if(document.getElementById('imgurl'))
		var imgurl = document.getElementById('imgurl').src
		
	// init wPaint
	$('#wPaint').wPaint({
	
	  image: imgurl,
	  bg: '#cacaca',
	  menuOffsetLeft: -155,
	  menuOffsetTop: -55,
	  menuHandle: false,   //non-draggable menu
	  imageStretch: true,  //scale up smaller images
	  saveImg: saveImg,
	  loadImgBg: loadImgBg,
	  loadImgFg: loadImgFg,
	  path: '../libraries/wPaint/',
	  bg: '#FFFFFF'
	});
	
	var username = Cookie.get("username");
	//var username = 'bruggess';
	
	var packet = {
		"username": username
	}
	
	var images = {};
	
	/*$.ajax({
		type: "GET",
		url: "http://webdraw.csse.rose-hulman.edu/all_user_picture_ids.php",
		dataType: "json",
		data: packet,
		success: function(data) {
			console.log("successful query");
			console.log(data);
			
			var img = document.createElement("img");
			img.src = "http://webdraw.csse.rose-hulman.edu/pictures/picture1.png";
			$("#wPaint-img").append(img);
			
			
			$("#wPaint-img").append("<img url = http://webdraw.csse.rose-hulman.edu/pictues/"+"picture1.png>"+"</img>");
			
			for(var pictureName in data) {
				for(var i = 0; i < data[pictureName].length; i++) {
					var img = document.createElement("img");
					img.src = "http://webdraw.csse.rose-hulman.edu/pictures/" + data[pictureName];
					$("#wPaint-img").append(img);
			 		$("#wPaint-img").append("<img url = \"http://webdraw.csse.rose-hulman.edu/pictues/"+data[pictureName][i]+"</img>");
			 	}
			 }
		},
		error: function(request, status, error) {
			console.log("Failure");
		}
	});*/
	
	
});


//array of image url's that can be inserted
var images = [
  '../../uploads/wPaint-test.png',
];

var msgTimer = null;



function saveImg(image) {
	var username = Cookie.get("username");
	//var username = 'bruggess';

	var packet = {
		"username": username
	}

  var _this = this;
  
  
    var name = prompt("Please enter an image name:", "Cool Pic");

  $.ajax({
	type: 'POST',
	url: 'http://webdraw.csse.rose-hulman.edu/upload.php',
	data: {
		image: image,
		name: name,
		username: username
	},
	success: function (resp) {
		//console.log(resp);

		// internal function for displaying status messages in the canvas
		_this._displayStatus('Image saved successfully');
		
		alert(resp);
	}
  });
}

function loadImgBg () {

  // internal function for displaying background images modal
  // where images is an array of images (base64 or url path)
  // NOTE: that if you can't see the bg image changing it's probably
  // becasue the foregroud image is not transparent.
  this._showFileModal('bg', images);
}

function loadImgFg () {

  // internal function for displaying foreground images modal
  // where images is an array of images (base64 or url path)
  console.log("loadImgFg");
  this._showFileModal('fg', images);
}

