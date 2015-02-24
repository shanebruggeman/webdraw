<!DOCTYPE html>
<html>
<head>
	<title>Web Draw</title>
	<!--CSS-->
	<link rel="stylesheet" type="text/css" href="../style/main.css">
	<link rel="stylesheet" type="text/css" href="../style/draw.css">
	
	<!--Javascript-->
	<script src="../libraries/jquery-2.1.3.min.js"></script>
	<script src="../javascript/index.js"></script>
	
	<!-- jQuery UI -->
	<script type="text/javascript" src="../libraries/wPaint/lib/jquery.ui.core.1.10.3.min.js"></script>
	<script type="text/javascript" src="../libraries/wPaint/lib/jquery.ui.widget.1.10.3.min.js"></script>
	<script type="text/javascript" src="../libraries/wPaint/lib/jquery.ui.mouse.1.10.3.min.js"></script>
	<script type="text/javascript" src="../libraries/wPaint/lib/jquery.ui.draggable.1.10.3.min.js"></script>

	<!-- wColorPicker -->
	<link rel="Stylesheet" type="text/css" href="../libraries/wPaint/lib/wColorPicker.min.css" />
	<script type="text/javascript" src="../libraries/wPaint/lib/wColorPicker.min.js"></script>
	
	<!-- wPaint -->
	<link rel="Stylesheet" type="text/css" href="../libraries/wPaint/src/wPaint.css" />
	<script type="text/javascript" src="../libraries/wPaint/src/wPaint.utils.js"></script>
	<script type="text/javascript" src="../libraries/wPaint/src/wPaint.js"></script>

	<!-- wPaint main -->
	<script type="text/javascript" src="../libraries/wPaint/plugins/main/src/fillArea.min.js"></script>
	<script type="text/javascript" src="../libraries/wPaint/plugins/main/src/wPaint.menu.main.js"></script>

	<!-- wPaint text -->
	<script type="text/javascript" src="../libraries/wPaint/plugins/text/src/wPaint.menu.text.js"></script>

	<!-- wPaint shapes -->
	<script type="text/javascript" src="../libraries/wPaint/plugins/shapes/src/shapes.min.js"></script>
	<script type="text/javascript" src="../libraries/wPaint/plugins/shapes/src/wPaint.menu.main.shapes.js"></script>

	<!-- wPaint file -->
	<script type="text/javascript" src="../libraries/wPaint/plugins/file/src/wPaint.menu.main.file.js"></script>
	
	

	<!--misc-->
	<link href="../../resources/images/paint_full1.gif" type="image/gif" rel="shortcut icon"/>
	
	<meta charset="UTF-8"> 
</head>
<body>
	<div class="wrapper">
		<header role="banner">
			<?php include 'navbar.html' ?>
		</header>
		<!--New Shit goes here-->		
		<div class="push"></div>
	</div>
	
	
<!-- END WPAINT ______________________________________________________________________________________________________-->
      <div id="wPaint" style="position:relative; width:240px; height:240px; margin:50px auto 0 auto;"></div>
      <div style="position:relative; width:240px; margin:10px auto;">
        <input id="email" type="text" placeholder="Enter email"/>
        <input id="email-button" type="button" value="Email Image" onclick="emailImg()"/>
        <span id="email-msg" style="color:#6699ff;"></span>
      </div>
      <div id="wPaint-img" style="position:relative; width:240px; margin:0 auto;"></div>

	  
	  
      <script type="text/javascript">
        var images = [
          '../../uploads/wPaint-test.png',
        ];

        var msgTimer = null;

        function saveImg(image) {
          var _this = this;

          $.ajax({
            type: 'POST',
            url: '../scripts/upload.php',
            data: {image: image},
            success: function (resp) {

              // internal function for displaying status messages in the canvas
              _this._displayStatus('Image saved successfully');

              // doesn't have to be json, can be anything
              // returned from server after upload as long
              // as it contains the path to the image url
              // or a base64 encoded png, either will work
              resp = $.parseJSON(resp);

              // update images array / object or whatever
              // is being used to keep track of the images
              // can store path or base64 here (but path is better since it's much smaller)
              images.push(resp.img);

              // do something with the image
              $('#wPaint-img').html($('<img/>').attr('src', image));
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
          this._showFileModal('fg', images);
        }

        function emailImg () {
          var email = $('#email').val();

          if ($.trim(email) === '') {
            alert('enter an email!');
            return;
          }

          $('#email-button').prop('disabled', true);
          $('#email-msg').html('');

          clearTimeout(msgTimer);

          $.ajax({
            type: 'POST',
            url: 'http://sendmail.websanova.com/wpaint_email',
            data: {
              email: email,
              image: $('#wPaint').wPaint('image')
            },
            success: function(resp) {
              //alert('successfully emailed image!');
            },
            complete: function() {
              $('#email-msg').html('Image successfully emailed.');
              $('#email-button').prop('disabled', false);

              msgTimer = setTimeout(function () {
                $('#email-msg').html('');
              }, 2000);
            }
          });
        }

		
        // init wPaint
        $('#wPaint').wPaint({
          bg: '#cacaca',
          menuOffsetLeft: -35,
          menuOffsetTop: -50,
          saveImg: saveImg,
          loadImgBg: loadImgBg,
          loadImgFg: loadImgFg,
		  path: '../libraries/wPaint/',
		  bg: '#FFFFFF'
        });
      </script>
    </div>
<!-- END WPAINT ____________________________________________________________________-->	

	<div style="display:none;" id="blackBackground" onclick="closelogin()"></div>
	<div class="footer"></div>
</body>
</html>