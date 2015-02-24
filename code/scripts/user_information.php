<?php 
	header("Access-Control-Allow-Origin: *");
	include 'setdb.php';
	$username = $_GET['username'];

	echo $username;

	$profileQuery = $db->prepare('select username, first_name, last_name, email from user where username = :username limit 1');
	$profileQuery->bindValue(':username', $username, PDO::PARAM_STR);

	$queryResults = array();

	if ($profileQuery->execute()) {
	    while ($row = $profileQuery->fetch(PDO::FETCH_ASSOC)) {
	       	$queryResults["username"] = $row["username"];
	       	$queryResults["first_name"] = $row["first_name"];
	       	$queryResults["last_name"] = $row["last_name"];
	       	$queryResults["email"] = $row["email"];
	    }
	}

	echo json_encode($queryResults);
 ?>