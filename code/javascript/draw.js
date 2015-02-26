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
	
	
});


//array of image url's that can be inserted
var images = [
  '../../uploads/wPaint-test.png',
];

var msgTimer = null;



function saveImg(image) {
	var username = Cookie.get("username");

	var packet = {
		"username": username
	}

  var _this = this;
  
  
    var name = prompt("Please enter an image name:", "Cool Pic");
	if(name!=null) {
		$.ajax({
		type: 'POST',
		url: 'http://webdraw.csse.rose-hulman.edu/upload.php',
		data: {
			image: image,
			name: name,
			username: username
		},
		success: function (resp) {

			// internal function for displaying status messages in the canvas
			_this._displayStatus('Image saved successfully');
			
			alert(resp);
		}
		});
  }
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
  this._showFileModal('fg', images);
}

