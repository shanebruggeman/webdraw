<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8"> 
	
	<title>Web Draw</title>
	<!--CSS-->
	<link rel="stylesheet" type="text/css" href="../style/main.css">
	<link rel="stylesheet" type="text/css" href="../style/draw.css">
	
	<!--Javascript-->
	<script src="../libraries/jquery-2.1.3.min.js"></script>
	<script src="http://malsup.github.com/jquery.form.js"></script>
	<script src="http://www.webstepbook.com/Cookie.js" type="text/javascript"></script>
	<script src="../javascript/main.js"></script>
	<script src="../javascript/imageupload.js"></script>
	
	<!-- jQuery UI -->
	<script type="text/javascript" src="../libraries/wPaint/lib/jquery.ui.core.1.10.3.min.js"></script>
	<script type="text/javascript" src="../libraries/wPaint/lib/jquery.ui.widget.1.10.3.min.js"></script>
	<script type="text/javascript" src="../libraries/wPaint/lib/jquery.ui.mouse.1.10.3.min.js"></script>
	<script type="text/javascript" src="../libraries/wPaint/lib/jquery.ui.draggable.1.10.3.min.js"></script>

	<!--misc-->
	<link href="../../resources/images/paint_full1.gif" type="image/gif" rel="shortcut icon"/>
</head>
<body>
	<div class="wrapper">
		<header role="banner">
			<?php include 'navbar.html' ?>
		</header>	
		<div class="push"></div>
	</div>
	
	<?php
		ini_set('display_errors', 'On');
		if ($_SERVER["REQUEST_METHOD"] == "POST") {
			save_post();
		}
	?>
	
	<form id="imageform" action="imageupload.php" method="post" enctype="multipart/form-data">
		<fieldset>
			<legend>post a new image</legend>
			
			<div>
				<input id = 'username' type = "test" name="username" size="40" readonly/>
			</div>
			
			<div>
				title: <br />
				<input type = "test" name="name" size="40" />
			</div>
			
			<div>
				image: <br />
				<input type="file" name="image" size="50" />
			</div>
			
			<div>
				<input id = "submitbutton" type="submit" value="post image" />
			</div>
		</fieldset>
	</form>
	
	<?php
		function save_post() {
			header("Access-Control-Allow-Origin: *");
			ini_set('display_errors', 'On');
			include '../../setdb.php';
			//$postPaths = "post*.txt"; 
			$postNum = 0;
			
			$picture_name = $_POST['name'];
			
			//$username = 'nygrendr';
			$username = $_POST['username'];
			
			// get id from user name
			$query = $db->prepare('select id from user where username = :username');
			$query->bindValue(':username', $username, PDO::PARAM_STR);
			$query->execute();

			$row = $query->fetch(PDO::FETCH_ASSOC);
			$ownerid = $row["id"];
			
			
			
			$image = $_FILES["image"]["tmp_name"];
			$imageSize = getimagesize($image);
			
			if(($imageSize[0] == 240) && ($imageSize[1] == 240)) {
				$profileQuery = $db->prepare('insert into picture(name,owner_id) values(:picture_name,:ownerid)');
				$profileQuery->bindValue(':picture_name', $picture_name, PDO::PARAM_STR);
				$profileQuery->bindValue(':ownerid', $ownerid, PDO::PARAM_STR);
				$profileQuery->execute();

				$maxQuery = $db->prepare('select max(id) as max from picture');
				$maxQuery->execute();

				$row = $maxQuery->fetch(PDO::FETCH_ASSOC);

				$id = $row["max"];
				
				
				if($_FILES["image"]["name"]!=null)
					move_uploaded_file($_FILES["image"]["tmp_name"], "../../pictures/picture".$id.".png");
				$postNum++;
				echo "Success";
			} else {
				echo "Image not 240x240. Dimensions: ".$imageSize[0]." x ".$imageSize[1];
			}
		}
	?>
	
	


	<div style="display:none;" id="blackBackground" onclick="closelogin()"></div>
	<div class="footer"></div>
</body>
</html>