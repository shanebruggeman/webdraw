<?php 
	header("Access-Control-Allow-Origin: *");

	include 'setdb.php';

	$username = $_POST['username'];

	$checkQuery = $db->prepare('select username from user where username=:username');
	$checkQuery->bindValue(':username', $username, PDO::PARAM_STR);
	$checkQuery->execute();
	$rowCount = $checkQuery->rowCount();

	if ($rowCount > 0){
		echo "taken";
	}else {
		echo "available";
	}

?>