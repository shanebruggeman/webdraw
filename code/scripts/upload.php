<?php
	header("Access-Control-Allow-Origin: *");
	ini_set('display_errors', 'On');
	include 'setdb.php';
	
	file_put_contents("post.txt","anonymous message: ");
	
	$image = imagecreatefrompng($_POST['image']);
	
	$id = uniqid();
	
	//print_r($_FILES["image"]);
	
	imagealphablending($image, false);
	imagesavealpha($image, true);
	imagepng($image, 'pictures/picture'.$id.'.png');
	
	// return image path
	//echo '{"img": "/pics/picture' . $id . '.png"}';
	//echo '{"img": pictures/$id}';
	echo "Image saved successfully";
?>