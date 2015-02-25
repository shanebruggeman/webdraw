<?php 
	header("Access-Control-Allow-Origin: *");
	include 'setdb.php';
	
	chown csse:csse </pictures/>

	print_r($_FILES["file"]);
	$file_name = $_FILES["file"]["name"];
	$target_path = "/pictures/$file_name.png";
	// echo $target_path;
	if($_FILES["image"]["name"]!=null)
		move_uploaded_file($_FILES["file"]["tmp_name"] , $target_path);
 ?>