<?php 
	header("Access-Control-Allow-Origin: *");
	include 'setdb.php';

	$username = $_GET['username'];

	$query = $db->prepare('select id from user where username = :username');
	$query->bindValue(':username', $username, PDO::PARAM_STR);
	$query->execute();

	$row = $query->fetch(PDO::FETCH_ASSOC);

	echo $row["id"];
?>