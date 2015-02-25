<?php
	header("Access-Control-Allow-Origin: *");
	ini_set('display_errors', 'On');
	include 'setdb.php';
	
	//file_put_contents("post.txt","anonymous message: ");
	
	$image = imagecreatefrompng($_POST['image']);
	
	//$id = uniqid();
	
	if(isset($_POST['parent'])) {
		$parentid = $_POST['parent'];
	}
	$picture_name = $_POST['name'];
	$ownerid = $_POST['userid'];
	
	//print_r($_FILES["image"]);
	
	$profileQuery = $db->prepare('insert into picture(name,owner_id) values(:picture_name,:ownerid)');
	$profileQuery->bindValue(':picture_name', $picture_name, PDO::PARAM_STR);
	$profileQuery->bindValue(':ownerid', $ownerid, PDO::PARAM_STR);
	$profileQuery->execute();

	$maxQuery = $db->prepare('select max(id) as max from picture');
	$maxQuery->execute();

	$row = $maxQuery->fetch(PDO::FETCH_ASSOC);

	$id = $row["max"];
	
	imagealphablending($image, false);
	imagesavealpha($image, true);
	imagepng($image, 'pictures/picture'.$id.'.png');
	
	echo 'Image uploaded successfully.';
?>