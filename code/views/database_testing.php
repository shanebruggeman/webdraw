<!DOCTYPE html>
<html>
<head>
	<title>Database Testing</title>
	<script src="../libraries/jquery-2.1.3.min.js"></script>
	<link rel="stylesheet" type="text/css" href="../style/main.css">
	<link rel="stylesheet" type="text/css" href="../style/profile.css">
	<script src="../javascript/database_testing.js"></script>
	<script src="http://www.webstepbook.com/Cookie.js" type="text/javascript"></script>
</head>
<body>
	<div class="wrapper">
		<?php include 'navbar.html' ?>
		<form id="uploadimage" action="" method="post" enctype="multipart/form-data">
		    Select image to upload:
		    <input type="file" name="file" id="file" required>
		    <input type="submit" value="Upload" name="submit">
		</form>

		<div id="dump_spot">
			
		</div>
	</div>



	</div>
</body>
</html>