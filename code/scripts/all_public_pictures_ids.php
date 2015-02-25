<?php 
	header("Access-Control-Allow-Origin: *");
	include 'setdb.php';

	$profileQuery = $db->prepare('select picture.id, picture.name from user join picture on user.id = picture.owner_id where picture.public = false');

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