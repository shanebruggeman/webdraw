<?php 
	header("Access-Control-Allow-Origin: *");
	include 'setdb.php';

	print_r($_FILES["file"]);
	$file_name = $_FILES["file"]["name"];
	$target_path = "/pictures/" . $file_name;
	// echo $target_path;
	move_uploaded_file($_FILES["file"]["tmp_name"] , $target_path);
 ?>