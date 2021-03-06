<!DOCTYPE html>
<html>
<head>
	<title>Web Draw</title>
	<!--CSS-->
	<link rel="stylesheet" type="text/css" href="../style/main.css">
	<link rel="stylesheet" type="text/css" href="../style/draw.css">
	
	<!--Javascript-->
	<script src="../libraries/jquery-2.1.3.min.js"></script>
	<script src="http://www.webstepbook.com/Cookie.js" type="text/javascript"></script>
	<script src="../javascript/main.js"></script>
	<script src="../javascript/draw.js"></script>
	
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
		<div class="push"></div>
	</div>
	
	<?php
		header("Access-Control-Allow-Origin: *");
		if(isset($_GET['imgurl'])) {
			$imgurl = $_GET['imgurl'];
			echo '<img id="imgurl" src ="' . $imgurl . '"></img>';
		}
	?>
	
<!-- BEGIN WPAINT __________________________________________________________________-->
      <div id="wPaint"></div>
      <div id="wPaint-img"></div>
<!-- END WPAINT ____________________________________________________________________-->	

	<div style="display:none;" id="blackBackground" onclick="closelogin()"></div>
	<div class="footer"></div>
</body>
</html>