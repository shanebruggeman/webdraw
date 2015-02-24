<?php 
	header("Access-Control-Allow-Origin: *");

	include 'setdb.php';

	$username = $_GET['username'];

	$profileQuery = $db->prepare('select picture.id, picture.name from user join picture on user.id = picture.owner_id where user.username = :username');
	$profileQuery->bindValue(':username', $username, PDO::PARAM_STR);

	$queryResults = array();

	if ($profileQuery->execute()) {
	    while ($row = $profileQuery->fetch(PDO::FETCH_ASSOC)) {
	    	$id = trim($row["id"]);
	    	$name = trim($row["name"]);

	    	$queryResults[$id] = $name;
	    }
	}

	echo json_encode($queryResults);
 ?>