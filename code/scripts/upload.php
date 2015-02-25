<?php
	header("Access-Control-Allow-Origin: *");
	ini_set('display_errors', 'On');
	include 'setdb.php';
	
	
		
	$image = imagecreatefrompng($_POST['image']);
	
	$id = uniqid();

	print_r($_FILES["image"]);
	
	imagealphablending($image, false);
	imagesavealpha($image, true);
	//imagepng($image, '/pics/picture' . $id . '.png');
	imagepng($image, '/pics/$id');

	// return image path
	//echo '{"img": "/pics/picture' . $id . '.png"}';
	echo '{"img": '/pics/$id'}';
?>