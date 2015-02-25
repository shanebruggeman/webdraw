<?php 
	header("Access-Control-Allow-Origin: *");
	include 'setdb.php';

	$requesterid = $_POST['requesterid'];
	$requesteeid = $_POST['requesteeid'];

	$query = $db->prepare('insert into friend_request(requester_id,requestee_id) values(:requester,:requestee)');
	$query->bindValue(':requester', $requesterid, PDO::PARAM_STR);
	$query->bindValue(':requestee', $requesteeid, PDO::PARAM_STR);
	$query->execute();
 ?>